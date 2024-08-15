/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { useHappenContext } from "@/context/HappenContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { LoginButton } from "@/components/AuthButton";

const Home: NextPage = () => {
  const router = useRouter();
  const fileId = "1ObdPBg_GkRk3VTbWN1b-SMOdSE5zrDrK";

  return (
    <div className="min-h-screen bg-black bg-[url('/assets/bg2.png')] bg-cover bg-no-repeat md:bg-center">
      <Header />
      <Navbar />

      <section className="flex h-[50vh] flex-1 flex-col items-center justify-center px-[40px] md:h-[50vh]">
        <img
          className="mb-[24px] h-16 object-scale-down px-1"
          src="/assets/logo/maternify-logo.png"
          alt=""
        />

        <h1 className="text-center text-[20px] font-semibold uppercase leading-none text-black md:text-[35px] ">
          Your trusted companion in your maternity journey
        </h1>

        <button
          onClick={() => {
            router.push("/debug");
          }}
          className="mx-auto mt-[32px] rounded-lg bg-[#FF0069] px-16 py-2 text-[16px] text-white md:mx-0 md:text-[18px]"
        >
          Debug
        </button>
      </section>

      <section>
        <div
          style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
        >
          <iframe
            src={`https://drive.google.com/file/d/${fileId}/preview`}
            className="absolute left-1/2 top-0 h-[85%] w-[85%] -translate-x-1/2 rounded-lg"
            frameBorder="0"
            width="80%"
            height="100%"
            allow="autoplay"
            allowFullScreen
            title="maternify"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
