import Layout from "@/layouts/Layout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
