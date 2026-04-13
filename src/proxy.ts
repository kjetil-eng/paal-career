import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - api routes, _next, _vercel
  // - file-based metadata routes (icon, apple-icon, opengraph-image, sitemap, robots)
  // - static assets (anything containing a dot)
  matcher: [
    "/((?!api|_next|_vercel|icon|apple-icon|opengraph-image|sitemap|robots|.*\\..*).*)",
  ],
};
