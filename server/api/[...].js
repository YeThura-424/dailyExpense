export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const params = getRouterParams(event);

  const paramPath = Array.isArray(params.slug)
    ? params.slug.join("/")
    : params.slug;
  const method = event.node.req.method;
  const { data } = await $fetch(`http://localhost:8000/api/${paramPath}`, {
    method: method,
    body: body,
  });

  return data;
});
