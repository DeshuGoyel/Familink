export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Expose runtime config to the frontend
    if (url.pathname === '/config') {
      return new Response(
        JSON.stringify({
          showLanding: env.SHOW_LANDING === 'true',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
        }
      );
    }

    // Serve all other requests from static assets
    return env.ASSETS.fetch(request);
  },
};
