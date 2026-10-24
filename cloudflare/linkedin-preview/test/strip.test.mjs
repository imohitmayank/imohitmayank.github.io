import assert from "node:assert/strict";
import { test } from "node:test";
import { Miniflare } from "miniflare";

const HOME_HTML = `<!DOCTYPE html>
<html><head>
<title>Mohit Mayank — AI Engineer, Researcher, and Author</title>
<meta name="description" content="AI engineer, researcher, and author of A Lazy Data Science Guide. Language models, knowledge graphs, and multi-modal AI.">
<meta property="og:title" content="Mohit Mayank — AI Engineer, Researcher, and Author">
<meta property="og:site_name" content="Mohit Mayank">
<meta property="og:description" content="AI engineer, researcher, and author of A Lazy Data Science Guide. Language models, knowledge graphs, and multi-modal AI.">
<meta property="og:url" content="https://mohitmayank.com/">
<meta property="og:type" content="website">
<meta property="og:image" content="https://mohitmayank.com/assets/og/preview.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:video" content="https://mohitmayank.com/assets/og/preview.mp4">
<meta property="og:video:url" content="https://mohitmayank.com/assets/og/preview.mp4">
<meta property="og:video:secure_url" content="https://mohitmayank.com/assets/og/preview.mp4">
<meta property="og:video:type" content="video/mp4">
<meta property="og:video:width" content="1200">
<meta property="og:video:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://mohitmayank.com/assets/og/preview.jpg">
</head><body>home</body></html>`;

const ABOUT_HTML = `<!DOCTYPE html><html><head>
<title>About</title>
<meta name="description" content="About Mohit">
</head><body>about-sentinel</body></html>`;

const LINKEDIN_UA =
  "LinkedInBot/1.0 (compatible; Mozilla/5.0; Jakarta Commons-HttpClient/4.3 +http://www.linkedin.com)";
const FACEBOOK_UA = "facebookexternalhit/1.1";

function originResponse(request) {
  const url = new URL(request.url);
  if (url.pathname.endsWith(".jpg")) {
    return new Response("jpeg-bytes", {
      headers: { "content-type": "image/jpeg", "cache-control": "max-age=14400" },
    });
  }
  const html = url.pathname === "/about" ? ABOUT_HTML : HOME_HTML;
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "max-age=600",
    },
  });
}

async function worker() {
  return new Miniflare({
    modules: true,
    scriptPath: new URL("../src/index.js", import.meta.url).pathname,
    serviceBindings: {
      ORIGIN(request) {
        return originResponse(request);
      },
    },
  });
}

test("LinkedInBot homepage HTML drops og:video and keeps the poster", async () => {
  const mf = await worker();
  try {
    const response = await mf.dispatchFetch("https://mohitmayank.com/", {
      headers: { "user-agent": LINKEDIN_UA },
    });
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.equal(html.includes("og:video"), false);
    assert.match(html, /property="og:image"/);
    assert.match(html, /property="og:site_name" content="Mohit Mayank"/);
    assert.match(html, /property="og:type" content="website"/);
    assert.match(html, /property="og:title" content="Mohit Mayank — AI Engineer, Researcher, and Author"/);
    assert.match(html, /preview\.jpg/);
    assert.equal(html.includes("preview.mp4"), false);
    assert.equal(response.headers.get("cache-control"), "private, no-store");
  } finally {
    await mf.dispose();
  }
});

test("Facebook and browsers still receive og:video", async () => {
  const mf = await worker();
  try {
    for (const userAgent of [FACEBOOK_UA, "Mozilla/5.0"]) {
      const response = await mf.dispatchFetch("https://mohitmayank.com/", {
        headers: { "user-agent": userAgent },
      });
      const html = await response.text();
      assert.match(html, /property="og:video"/);
      assert.match(html, /property="og:video:secure_url"/);
      assert.match(html, /property="og:video:type" content="video\/mp4"/);
      assert.match(html, /property="og:image"/);
      assert.equal(response.headers.get("cache-control"), "max-age=600");
    }
  } finally {
    await mf.dispose();
  }
});

test("LinkedInBot image fetches and other pages are not rewritten into video markup", async () => {
  const mf = await worker();
  try {
    const image = await mf.dispatchFetch(
      "https://mohitmayank.com/assets/og/preview.jpg",
      { headers: { "user-agent": LINKEDIN_UA } },
    );
    assert.equal(await image.text(), "jpeg-bytes");
    assert.equal(image.headers.get("content-type"), "image/jpeg");
    assert.equal(image.headers.get("cache-control"), "max-age=14400");

    const about = await mf.dispatchFetch("https://mohitmayank.com/about", {
      headers: { "user-agent": LINKEDIN_UA },
    });
    const html = await about.text();
    assert.match(html, /about-sentinel/);
    assert.equal(html.includes("og:video"), false);
    assert.equal(html.includes("preview.mp4"), false);
  } finally {
    await mf.dispose();
  }
});
