<template>
  <Head>
    <Title>Daily Expense</Title>
    <Meta name="description" content="Expence Tracker" />
    <Meta
      property="og:description"
      content="Track your daily expense easily here"
    />
    <Meta property="og:title" content="Expence Tracker" />
    <Meta property="og:type" content="website" />
  </Head>
  <AppShell>
    <NuxtLoadingIndicator color="#7F3DFF" />
    <slot />
  </AppShell>
</template>
