<template>
  <Head>
    <Title>Daily Expence</Title>
    <Meta name="description" content="Expence Tracker" />
    <Meta
      property="og:description"
      content="Track your daily expense easily here"
    />
    <Meta property="og:title" content="Expence Tracker" />
    <Meta property="og:type" content="website" />
  </Head>
  <div class="bg-[#eee]">
    <NuxtLoadingIndicator color="#801c1d" />
    <slot />
    <!-- <MobileMainNav /> -->
  </div>
</template>
