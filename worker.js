export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Serve 'main' file for root or /main
    if (url.pathname === "/" || url.pathname === "/main") {
      const response = await env.ASSETS.fetch(new Request(new URL("/main", request.url)));
      return new Response(response.body, {
        ...response,
        headers: {
          ...response.headers,
          "Content-Type": "text/html",
        },
      });
    }

    // Default behavior for other assets
    return env.ASSETS.fetch(request);
  },
};
