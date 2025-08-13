import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { AuthContextProvider } from "@/context/auth.context";

export default function App({ Component, pageProps }: AppProps) {
  const isLoginPage = pageProps.LoginPage;

  return isLoginPage ? (
    <Component {...pageProps} />
  ) : (
    <AuthContextProvider>
      <Layout title="Admin Panel">
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}
