import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
