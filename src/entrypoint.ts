interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      // Try to serve the static asset from the ASSETS binding
      const response = await env.ASSETS.fetch(request);
      
      // If the asset is found and served, return it (status 200, 304, etc.)
      // (Note: we check if status is not 404)
      if (response.status !== 404) {
        return response;
      }
    } catch (e) {
      console.error("Error fetching static asset:", e);
    }
    
    // SPA Routing Fallback: Serve index.html for client-side routes (like /dashboard)
    const indexRequest = new Request(new URL('/', request.url).toString(), request);
    return await env.ASSETS.fetch(indexRequest);
  }
};
