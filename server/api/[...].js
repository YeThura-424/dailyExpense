import { backendRequest, clearBackendSession, saveSession } from '../utils/backend';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const method = event.req.method;
  const paramPath = event.context.params._;

  // Avatar files are served outside Nest's /api/v1 prefix.
  if (paramPath.startsWith('avatars/')) {
    const path = paramPath.slice('avatars/'.length);
    if (method !== 'GET' || !/^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/.test(path) || path.includes('..')) {
      throw createError({ statusCode: 404 });
    }
    return sendProxy(event, `${new URL(config.apiBaseUrl).origin}/uploads/avatars/${path}`);
  }

  let body;
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    body = getHeader(event, 'content-type')?.startsWith('multipart/form-data')
      ? await readFormData(event)
      : await readBody(event);
  }

  const publicAuth = ['auth/login', 'auth/signup', 'auth/forgot-password', 'auth/refresh'].includes(paramPath);
  const recoveryToken = paramPath === 'auth/password' ? body?.recoveryToken : undefined;
  if (recoveryToken !== undefined) {
    if (typeof recoveryToken !== 'string' || !recoveryToken) throw createError({ statusCode: 400 });
    body = { new_password: body.new_password };
  }
  if (paramPath === 'auth/refresh') {
    const refreshToken = getCookie(event, 'refresh_token');
    if (!refreshToken) throw createError({ statusCode: 401 });
    body = { refreshToken };
  }

  let data = await backendRequest(event, paramPath, {
    method,
    query: getQuery(event),
    body,
    ...(recoveryToken ? { headers: { Authorization: `Bearer ${recoveryToken}` } } : {}),
  }, !publicAuth && !recoveryToken);

  if (['auth/login', 'auth/signup', 'auth/refresh'].includes(paramPath) && data.success) {
    const session = data.data.session;
    if (session) saveSession(event, session);
    data = { success: true, data: { user: data.data.user, authenticated: !!session } };
  }
  if (['auth/logout', 'auth/password'].includes(paramPath) && data.success) {
    clearBackendSession(event);
  }

  // Preserve the original proxy response wrapper.
  return { data };
});
