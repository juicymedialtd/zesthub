import "../styles/globals.css";

import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

import SideLayout from "../layout/SideLayout";

const queryClient = new QueryClient();

function Auth({ children }) {
  const { data: session, status } = useSession({ required: true });
  const isUser = !!session?.user;
  useEffect(() => {
    if (status) return; // Do nothing while loading
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <div className="flex h-screen justify-center items-center text-green-600">
      ...
      {/* <ScaleLoader color="green" loading={status} size={100} /> */}
    </div>
  );
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  if (router.asPath.slice(0, 5) === "/auth") {
    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  }

  return (
    <>
      <Head>
        <title>ZestHub</title>
        <meta name="description" content="Internal HR management" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Auth>
            <SideLayout>
              <Component {...pageProps} />
            </SideLayout>
          </Auth>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
