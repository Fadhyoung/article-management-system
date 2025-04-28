import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['drive.google.com', 'nkihbopqxauxphmaqvey.supabase.co'],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
