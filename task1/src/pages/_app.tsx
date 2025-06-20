import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";

export default function App({ Component, pageProps, router }: AppProps) {
  const noLayoutRoutes = ["/login", "/forgot-password"];

  const isNoLayoutRoute = noLayoutRoutes.includes(router.pathname);

  return isNoLayoutRoute ? (
    <Component {...pageProps} />
  ) : (
    <Layout title="Admin Panel">
      <Component {...pageProps} />
    </Layout>
  );
}
