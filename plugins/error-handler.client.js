export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (error) => {
    // Avoid replacing an existing API error or recursing while it is rendered.
    if (nuxtApp.payload.error) return;

    nuxtApp.runWithContext(() => showError({
      statusCode: error?.statusCode || 500,
      statusMessage: 'Unable to display this page',
      fatal: true,
      data: { kind: 'client' },
    }));
  });
});
