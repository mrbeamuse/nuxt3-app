import dayjs from "dayjs";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("format", (date?: Date, template?: string) => {
    return dayjs(date).format(template);
  });
});
