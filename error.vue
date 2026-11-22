<script setup>
const props = defineProps({
  error: { type: Object, required: true },
});

const statusCode = computed(() => Number(props.error.statusCode) || 500);
const content = computed(() => {
  if (statusCode.value === 404) return {
    title: 'We couldn’t find that page',
    message: 'The link may have changed, or the page may no longer be available. Head home to continue tracking your expenses.',
    label: 'Page not found',
  };
  if (props.error.data?.kind === 'client') return {
    title: 'This page hit a little snag',
    message: 'Something went wrong while displaying this page. Reload it to give things a fresh start.',
    label: 'Page error',
  };
  if (props.error.data?.kind === 'api' || [502, 503, 504].includes(statusCode.value)) return {
    title: 'We’re having trouble connecting',
    message: 'We can’t reach our service right now. Check your internet connection or give us a moment, then try again.',
    label: 'Service unavailable',
  };
  if (statusCode.value === 401 || statusCode.value === 403) return {
    title: 'This page isn’t available to you',
    message: 'You may need to sign in with an account that has access. Head home to get started.',
    label: 'Access unavailable',
  };
  return {
    title: 'Something went wrong',
    message: 'We couldn’t load this page right now. Please try again in a moment.',
    label: 'Unexpected error',
  };
});

useHead(() => ({
  title: `${content.value.label} | Daily Expense`,
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
}));

// Reload the current page without replaying a failed form submission.
const retry = () => window.location.reload();
const goHome = () => clearError({ redirect: '/' });
</script>

<template>
  <main class="error-screen" aria-labelledby="error-title">
    <div class="error-brand">Daily Expense<span>Every expense, a little clearer.</span></div>
    <section class="error-card">
      <div class="error-symbol" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
          <rect x="10" y="14" width="44" height="38" rx="10" stroke="currentColor" stroke-width="3" />
          <path d="M10 25h44M25 35l-5 5 5 5m14-10 5 5-5 5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <p class="error-label">{{ statusCode }} · {{ content.label }}</p>
      <h1 id="error-title">{{ content.title }}</h1>
      <p class="error-message">{{ content.message }}</p>
      <div class="error-actions">
        <button v-if="statusCode !== 404" type="button" class="error-primary" @click="retry">Try again</button>
        <button type="button" :class="statusCode === 404 ? 'error-primary' : 'error-secondary'" @click="goHome">Go to home</button>
      </div>
      <p v-if="statusCode !== 404" class="error-note">If you were saving a change, check it before submitting again.</p>
    </section>
  </main>
</template>

<style scoped>
.error-screen { min-height: 100vh; min-height: 100dvh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px 20px; background: #f8f7fc; color: #292b2d; }
.error-brand { text-align: center; color: #7f3dff; font-size: 22px; font-weight: 750; margin-bottom: 32px; }
.error-brand span { display: block; color: #666575; font-size: 14px; font-weight: 400; margin-top: 6px; }
.error-card { width: 100%; max-width: 540px; padding: 40px 28px; border: 1px solid #e9e5f2; border-radius: 24px; background: white; text-align: center; box-shadow: 0 12px 48px #34205b08; }
.error-symbol { display: grid; place-items: center; width: 100px; height: 100px; border-radius: 28px; background: #eee5ff; color: #7f3dff; margin: 0 auto 24px; }
.error-label { color: #6b36cf; font-size: 14px; font-weight: 600; }
h1 { font-size: clamp(26px, 5vw, 34px); font-weight: 750; line-height: 1.2; letter-spacing: -.035em; margin: 14px 0 16px; }
.error-message { font-size: 16px; line-height: 1.7; color: #666575; }
.error-actions { display: flex; justify-content: center; gap: 12px; margin-top: 28px; }
.error-actions button { min-height: 48px; padding: 12px 24px; border-radius: 12px; font-size: 16px; font-weight: 600; }
.error-message { font-size: 16px; line-height: 1.75; color: #666575; }
.error-actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.error-actions button { min-height: 48px; padding: 12px 24px; border: 1px solid transparent; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; }
.error-primary { background: #7f3dff; color: white; }
.error-primary:hover { background: #6b2de0; }
.error-secondary { background: #f3edff; color: #6630c5; }
.error-secondary:hover { background: #e9deff; }
.error-actions button:focus-visible { outline: 3px solid #7f3dff; outline-offset: 4px; }
.error-note { color: #777280; font-size: 14px; line-height: 1.6; margin-top: 24px; }
@media (max-width: 400px) { .error-card { padding: 32px 20px; } .error-actions { flex-direction: column; } }
</style>
