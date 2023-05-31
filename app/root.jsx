import { cssBundleHref } from "@remix-run/css-bundle";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStyles from "~/styles/tailwind.css";
import inter from "@fontsource/inter/index.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: tailwindStyles,
  },
  {
    rel: "stylesheet",
    href: inter,
  },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body style={{ fontFamily: '"DM Sans", sans-serif' }}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
