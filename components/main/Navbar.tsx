import { Socials } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <a
          href="#about-me"
          className="h-auto w-auto flex flex-row items-center"
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="cursor-pointer hover:animate-slowspin"
          />

          <span className="font-bold ml-[10px] hidden md:block text-gray-300">
            AXIOM
          </span>
        </a>

        <div className="w-[500px] h-full flex flex-row items-center justify-between md:ml-20 md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            <a href="#about-me" className="cursor-pointer">
              About Us
            </a>
            <a href="#skills" className="cursor-pointer">
              Overview
            </a>
            <a href="#features" className="cursor-pointer">
              Features
            </a>
            <a href="#projects" className="cursor-pointer">
              Pricing
            </a>
          </div>
        </div>

        {/* <div className="flex flex-row gap-5">
          {Socials.map((social) => (
            <Image
              src={social.src}
              alt={social.name}
              key={social.name}
              width={24}
              height={24}
            />
          ))}
        </div> */}
        <div className=" flex flex-row ">
          <div className="flex items-center justify-between w-42 h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            <Link href="/sign-in" className="cursor-pointer">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
