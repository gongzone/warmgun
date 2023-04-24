import { type NextPage } from "next";
import Image from "next/image";
import React from "react";

import heroCardImage from "../assets/strolling.svg";
import Header from "~/components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <BackgroundWrapper>
        <Hero />
      </BackgroundWrapper>
    </>
  );
};

export default Home;

const BackgroundWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="h-[1024px]"
      style={{
        backgroundImage: `
          radial-gradient(at 0% 0%, rgba(70 133 175 / 0.11) 0px,transparent 50%),
          radial-gradient(at 98% 1%, rgba(210 127 129 / 0.11) 0px, transparent 50%)
          `,
      }}
    >
      {children}
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="px-[5vw] py-10">
      <div className="card-compact card w-full bg-base-100 shadow-xl">
        <figure className="mx-7 mt-7 bg-primary">
          <Image src={heroCardImage} alt="hero-card-image" />
        </figure>
        <div className="card-body !px-8">
          <h2 className="card-title font-logo">Warmgun</h2>
          <div className="flex flex-col gap-1">
            <p>개발 커뮤니티 & 블로그 서비스</p>
            <p className="">외로운 개발자들을 위하여!</p>
          </div>
          <div className="card-actions mt-2 justify-end">
            <button className="btn-primary btn">About</button>
          </div>
        </div>
      </div>
    </div>
  );
};
