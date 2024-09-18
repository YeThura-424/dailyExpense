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
  <div class="bg-[#eee] min-h-screen">
    <NuxtLoadingIndicator color="#7F3DFF" />
    <slot />
    <!-- <MobileMainNav /> -->
     <div class=" w-full h-[50px] bg-[#eee] fixed bottom-6">
      <MobileFootNav />
     </div>
  </div>
</template>
