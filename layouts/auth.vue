<template>
  <div class="auth-shell">
    <NuxtLoadingIndicator color="#7F3DFF" />
    <aside class="auth-story">
      <NuxtLink to="/login" class="app-brand"><span class="brand-mark"><Icon name="ion:wallet-outline" /></span><span class="brand-copy">Daily<span>Expense</span></span></NuxtLink>
      <div class="auth-story-content"><span class="auth-kicker">A LITTLE CLARITY, EVERY DAY</span><h1>Your money.<br />Your everyday.<br /><span>In balance.</span></h1><p>A simple place for your wallets, spending, and the plans you’re working toward.</p><div class="auth-feature"><Icon name="ion:checkmark-circle-outline" /> Every expense, in one place</div><div class="auth-feature"><Icon name="ion:checkmark-circle-outline" /> Budgets that keep you on track</div></div>
      <p class="auth-story-footer">Small steps. A clearer financial picture.</p>
    </aside>
    <main class="auth-content"><div class="auth-mobile-brand"><Icon name="ion:wallet-outline" /><span>Daily Expense</span></div><div class="auth-card"><slot /></div><p class="auth-caption">Your everyday finances, thoughtfully organised.</p></main>
  </div>
</template>
