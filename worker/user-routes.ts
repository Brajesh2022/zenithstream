import { Hono } from "hono";
import type { Env } from './core-utils';
import { ok, bad } from './core-utils';
const API_BASE_URL = 'https://animeh.brajeshcodes.workers.dev';
async function proxyRequest(tool: string, url: string | undefined) {
  if (!url) {
    return { error: 'URL query parameter is required', status: 400 };
  }
  try {
    const encodedUrl = encodeURIComponent(url);
    const targetUrl = `${API_BASE_URL}/api/parse/${tool}?url=${encodedUrl}`;
    const response = await fetch(targetUrl, {
      headers: { 'User-Agent': 'ZenithStream-Worker/1.0' }
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[PROXY ERROR] Tool: ${tool}, URL: ${url}, Status: ${response.status}, Body: ${errorText}`);
      return { error: `Failed to fetch from upstream API: ${response.statusText}`, status: response.status };
    }
    const data = await response.json();
    return { data };
  } catch (e) {
    console.error(`[PROXY CATCH] Tool: ${tool}, URL: ${url}, Error: ${e}`);
    return { error: 'An internal error occurred', status: 500 };
  }
}
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  const v1 = new Hono<{ Bindings: Env }>();
  v1.get('/home', async (c) => {
    const url = c.req.query('url');
    const { data, error, status } = await proxyRequest('home', url);
    if (error) return bad(c, error);
    return ok(c, data);
  });
  v1.get('/search', async (c) => {
    const url = c.req.query('url');
    const { data, error, status } = await proxyRequest('search', url);
    if (error) return bad(c, error);
    return ok(c, data);
  });
  v1.get('/content', async (c) => {
    const url = c.req.query('url');
    const tool = c.req.query('tool');
    if (!tool || !['series', 'movie', 'episode'].includes(tool)) {
      return bad(c, 'Invalid or missing tool parameter. Must be one of: series, movie, episode.');
    }
    const { data, error, status } = await proxyRequest(tool, url);
    if (error) return bad(c, error);
    return ok(c, data);
  });
  app.route('/api/v1', v1);
}