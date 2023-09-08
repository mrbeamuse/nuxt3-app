<template>
  <div>
    <h1>Mid Page</h1>
  </div>
</template>
<script setup lang="ts">
// definePageMeta({
//   middleware(to, from) {
//     console.log();

//     console.log("匿名中间件，具体页面执行", to, from);
//   },
// });
definePageMeta({
  middleware: ["amid", "bmid"],
});
</script>

<style lang="scss"></style>
