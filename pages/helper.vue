<template>
  <div>
    <!-- 客户端和服务端时间不一致，会造成注水时间不一致，所以使用 ClientOnly-->
    <ClientOnly>
      <p>{{ date1 }}</p>
      <p>{{ date2 }}</p>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();
const date1 = nuxtApp.$format();
const date2 = nuxtApp.$format(new Date(), "YYYY/MM/DD");
</script>
