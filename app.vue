<template>
  <div>
    <NuxtLayout>
      <NMessageProvider>
        <NuxtPage></NuxtPage>
      </NMessageProvider>
    </NuxtLayout>
  </div>
</template>

<script>
// import "~/assets/global.scss";
useHead({
  titleTemplate: (s) => {
    return s ? `${s} - 村长的技术空间` : "村长的技术空间";
  },
});
</script>
