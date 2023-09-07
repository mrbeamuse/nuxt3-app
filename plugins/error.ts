export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (..._args) => {
    // 最内部层级的错误处理
    console.log("vue error handler");
  };
  nuxtApp.hook("app:error", (..._args) => {
    // 最外部层级的错误处理
    console.log("app:error");
  });
  nuxtApp.hook("vue:error", (..._args) => {
    // 处理 Vue 组件内部的错误
    console.log("vue:error");
  });
});
