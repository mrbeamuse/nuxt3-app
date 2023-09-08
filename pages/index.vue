<template>
  <div class="flex items-center flex-col gap-2 py-4">
    <!-- 处理请求错误 -->
    <div v-if="error" class="text-red-300">{{ error.message }}</div>
    <!-- 处理加载状态 -->
    <div v-if="pending">加载中...</div>
    <div v-else>
      <div v-for="post in posts" :key="post.id">
        <NuxtLink class="text-lg" :to="`/detail/${post?.id}`">{{
          (post as unknown as Post)?.title
        }}</NuxtLink>
        <p class="text-slate-500">发布于: {{ post?.date }}</p>
      </div>
    </div>
    <div @click="prev">上一页</div>
    <div @click="next">下一页</div>
    <h1>Color mode: {{ $colorMode.value }}</h1>
    <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ComponentInternalInstance, getCurrentInstance } from "vue";
interface Post {
  id: number;
  title: string;
  date: string;
}

const colorMode = useColorMode();
console.log(colorMode.preference);

const page = ref(1);
const {
  data: posts,
  pending,
  error,
  refresh, // 获取刷新函数
} = await useFetch(() => `/api/posts?page=${page.value}&size=1`); // 注意修改为工厂函数方式

function prev() {
  page.value--;
  refresh();
}

function next() {
  page.value++;
  refresh();
}

const ins = getCurrentInstance();
onMounted(() => {
  // (ins as ComponentInternalInstance)?.proxy?.$alert("component mounted！");
});
</script>
<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
