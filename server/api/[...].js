export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const token = localStorage.getItem("token");

  const { data } = await $fetch("http://localhost:8000/api/", {
    method: "post",
    body: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "x-api-token": "4fGh9Kj7Lm1Nq2RzXw8T",
    },
  });

  return data;
});
