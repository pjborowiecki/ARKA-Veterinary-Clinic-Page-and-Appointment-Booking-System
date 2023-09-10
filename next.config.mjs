/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs")

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["uploadthing.com"],
  },
  experimental: {
    serverActions: true,
  },
  redirects: () => [
    {
      source: "/admin",
      destination: "/admin/przychodnia",
      permanent: false,
    },
  ],
}

export default nextConfig
