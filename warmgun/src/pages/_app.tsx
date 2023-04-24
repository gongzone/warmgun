import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import { Concert_One } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const nanumSquareNeo = localFont({
  src: "./NanumSquareNeo-Variable.ttf",
  variable: "--font-nanum-square-neo",
});

const concertOne = Concert_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-concert-one",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <div
      className={`${nanumSquareNeo.variable} ${concertOne.variable} font-sans`}
    >
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
