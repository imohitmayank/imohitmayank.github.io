// LinkedIn Post Inspector sets Type to Video when any og:video* tag is
// present, then reports "No image found" for a self-hosted MP4 and does
// not fall back to og:image. It never plays that file. Remove the video
// tags for LinkedInBot only. iMessage and Facebook still receive them.
const VIDEO_PROPERTY = /^og:video(?::|$)/;

export default {
  async fetch(request, env) {
    const response = await (env.ORIGIN
      ? env.ORIGIN.fetch(request)
      : fetch(request));

    const userAgent = request.headers.get("user-agent") || "";
    if (!/LinkedInBot/i.test(userAgent)) return response;

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    const rewritten = new HTMLRewriter()
      .on("meta", {
        element(element) {
          const property = element.getAttribute("property") || "";
          if (VIDEO_PROPERTY.test(property)) element.remove();
        },
      })
      .transform(response);

    // Do not let a shared cache store the stripped HTML and serve it to
    // crawlers that should still see og:video.
    const headers = new Headers(rewritten.headers);
    headers.set("Cache-Control", "private, no-store");
    headers.set("CDN-Cache-Control", "no-store");
    headers.set("Vary", "User-Agent");
    headers.delete("Expires");

    return new Response(rewritten.body, {
      status: rewritten.status,
      statusText: rewritten.statusText,
      headers,
    });
  },
};
