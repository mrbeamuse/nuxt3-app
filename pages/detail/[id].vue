<template>
  <div class="p-5">
    <div v-if="error" class="text-red-500">{{ errorMsg }}</div>
    <div v-else-if="pending">加载中...</div>
    <div v-else>
      <h1 class="text-2xl">{{ data?.title }}</h1>
      <div v-html="data?.content"></div>
      <!-- 评论区 -->
      <div class="py-2">
        <NInput v-model:value="value" type="textarea" placeholder="输入评论" />
        <NButton @click="onSubmit">发送</NButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 从 Nuxt 3 导入,#app 为 Nuxt 3 的根组件，虚拟导入
import { NuxtError } from "#app";
import { useUser } from "~/store/user";
// 获取状态，转换为 Ref，其他代码无需改变
const store = useUser();
const { isLogin } = storeToRefs(store);
const router = useRouter();
const route = useRoute();
useHead({
  title: route.params.id as string,
});
// 定义中间件守护路由
// definePageMeta({
//   middleware: ["auth"],
// });

// const fetchPost = () => $fetch(`/api/detail/${route.params.id}`);
const fetchPost = () =>
  $fetch(`/api/detail/${route.params.id}`, {
    // 如果已登录，请求时携带令牌
    headers: store.isLogin ? { token: "abc" } : {},
    onResponseError: ({ response }) => {
      // 如果响应 401 错误，重新登录
      if (response.status === 401) {
        router.push("/login?callback=" + route.path);
      }
    },
  });

const { data, pending, error } = await useAsyncData(fetchPost);

// 获取服务端返回的错误信息
const errorMsg = computed(() => (error.value as NuxtError).statusMessage);
// 显示全屏错误页
watchEffect(() => {
  // error 存在，则显示错误页
  if (unref(error)) {
    showError(errorMsg.value as string);
  }
});

// 增加评论相关逻辑，注意登录状态的获取和使用
const value = useState("comment", () => "");
const onSubmit = () => {
  if (isLogin.value) {
    // 提交留言...
    value.value = "";
  } else {
    // 要求登录
    router.push("/login?callback=" + route.path);
  }
};
</script>
