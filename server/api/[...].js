export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const token = localStorage.getItem("token");

  const { data } = await $fetch("http://localhost:8000/api/", {});

  return data;
});
