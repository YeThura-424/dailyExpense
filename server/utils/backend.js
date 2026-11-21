import { createError, deleteCookie, getCookie, getRequestURL, setCookie, setResponseHeader } from 'h3';

const refreshes = new Map();
const cookieOptions = { httpOnly: true, sameSite: 'lax', path: '/' };

export function clearBackendSession(event) {
  for (const name of ['token', 'refresh_token']) deleteCookie(event, name, cookieOptions);
}

export function saveSession(event, session) {
  const secure = useRuntimeConfig(event).sessionCookieSecure;
  setCookie(event, 'token', session.access_token, {
    ...cookieOptions, secure, maxAge: session.expires_in,
  });
  setCookie(event, 'refresh_token', session.refresh_token, {
    ...cookieOptions, secure, maxAge: 60 * 60 * 24 * 30,
  });
}

export function backendError(error) {
  const statusCode = error.response?.status || error.statusCode || 502;
  const details = error.data;
  const message = details?.message || details?.error || (statusCode === 502 ? 'Unable to reach the Daily Expense API' : 'API request failed');
  return createError({ statusCode, statusMessage: 'API request failed', data: {
    success: false, error: Array.isArray(message) ? message.join(', ') : message,
  } });
}

export async function backendRequest(event, path, options = {}, authenticated = true) {
  setResponseHeader(event, 'Cache-Control', 'no-store');
  const config = useRuntimeConfig(event);
  const baseURL = config.apiBaseUrl.replace(/\/$/, '');
  const target = new URL(baseURL);
  const source = getRequestURL(event);
  const normalizeHost = (hostname) => ['localhost', '127.0.0.1', '[::1]'].includes(hostname) ? 'loopback' : hostname;
  if (normalizeHost(target.hostname) === normalizeHost(source.hostname) && target.port === source.port && target.protocol === source.protocol) {
    throw createError({ statusCode: 502, statusMessage: 'NUXT_API_BASE_URL must point to Nest, not the Nuxt server' });
  }
  const request = (token) => $fetch(`${baseURL}/${path}`, {
    ...options, retry: 0,
    headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  });
  let token = getCookie(event, 'token');
  const refreshToken = getCookie(event, 'refresh_token');
  try {
    if (authenticated && !token) {
      if (!refreshToken) throw createError({ statusCode: 401, data: { error: 'Please log in' } });
      token = await refreshSession();
    }
    try {
      return await request(authenticated ? token : undefined);
    } catch (error) {
      if (!authenticated || error.response?.status !== 401 || !refreshToken) throw error;
      return await request(await refreshSession());
    }
  } catch (error) {
    if ((error.response?.status || error.statusCode) === 401) clearBackendSession(event);
    throw backendError(error);
  }

  async function refreshSession() {
    // Share refreshes across concurrent requests; the API rotates refresh tokens.
    let pending = refreshes.get(refreshToken);
    if (!pending) {
      pending = $fetch(`${baseURL}/auth/refresh`, {
        method: 'POST', body: { refreshToken }, retry: 0,
      });
      refreshes.set(refreshToken, pending);
      const timer = setTimeout(() => refreshes.delete(refreshToken), 5000);
      timer.unref?.();
    }
    const result = await pending;
    saveSession(event, result.data.session);
    return result.data.session.access_token;
  }
}
