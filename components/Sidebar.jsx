import React from "react";
import {
  KeyboardArrowRight,
  KeyboardArrowDown,
  LanguageOutlined,
  Clear,
} from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "@mui/material";
import Image from "next/image";

const Sidebar = ({ setShowSideBar }) => {
    const { data: session } = useSession();
  return (
    <div className="sm:w-5/12 md:w-4/12 lg:w-3/12 xl:w-2/12">
    <header className="relative flex top-0 z-40   text-xl font-extrabold pb-3  items-center bg-gray-300 pl-10 pt-3 pr-5 space-x-2 ">
      <Avatar src={session?.user.image } />

      <p>
        <text>hello</text>, {" "}
        {session ? (
          <span className="text-yellow-400 font-bold">
            {" "}
            {session.user.name.split(" ")[0]}
          </span>
        ) : (
            <text>sign In</text>
        )}
      </p> 
      <div
        onClick={() => setShowSideBar(false)}
        className="absolute -right-12 "
      >
        <Clear fontSize="large" className="text-white" />
      </div>
    </header>
    <div className="  ">
      <div className="overflow-y-scroll h-screen">
        <div className="bg-white pt-5 pb-5 pl-10 flex flex-col border-b border-gray-300 ">
          <h1 className="mb-7 font-bold text-xl">Trending</h1>
          <p className="mb-7">Best Sellers</p>
          <p className="mb-7">New Releases</p>
          <p className="mb-7">Movers & Shakers</p>
        </div>
        <div className="bg-white pr-5 pt-5 pb-5 pl-10 flex flex-col border-b border-gray-300 ">
          <h1 className="mb-7 font-bold text-xl">
            Digital Content And Devices
          </h1>
          <div className="flex justify-between align-center">
            <p className="mb-7">Best Sellers</p>
            <KeyboardArrowRight
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
          <div className="flex justify-between align-center">
            <p className="mb-7">Fire Tablets & Fire TV</p>
            <KeyboardArrowRight
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
          <div className="flex justify-between align-center">
            <p className="mb-7">Kindle</p>
            <KeyboardArrowRight
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
          <div className="flex justify-between align-center">
            <p className="mb-7">Audible Audiobooks</p>
            <KeyboardArrowRight
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
          <div className="flex justify-between align-center">
            <p className="mb-7">Tochi Branches</p>
            <KeyboardArrowRight
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
          <div className="flex justify-between align-center">
            <p className="mb-7">Tochi Music</p>
            <KeyboardArrowRight
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
          <div className="flex justify-between align-center">
            <p className="mb-7">Appstore for Android</p>
            <KeyboardArrowRight
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
        </div>
        <div className="bg-white pr-5 pt-5 pb-5 pl-10 flex flex-col border-b border-gray-300 ">
          <h1 className="mb-7 font-bold text-xl">Shop By Department</h1>
          <div className="flex justify-between align-center">
            <p className="mb-7">Books</p>
            <KeyboardArrowRight
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
          <div className="flex justify-between align-center">
            <p className="mb-7">Video Games & Prime Gaming</p>
            <KeyboardArrowRight
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
          <div className="flex justify-between align-center">
            <p className="mb-7">Music, Movies & TV Shows</p>
            <KeyboardArrowRight
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
          <div className="flex justify-between align-center">
            <p className="mb-7">Electronis, Computers & Office</p>
            <KeyboardArrowRight
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
          <div className="flex">
            <p className="mb-7">See All</p>
            <KeyboardArrowRight
              fontSize="medium"
              className="text-gray-500 ml-3 "
            />
          </div>
        </div>
        <div className="bg-white pr-5 pt-5 pb-5 pl-10 flex flex-col border-b border-gray-300 ">
          <h1 className="mb-7 font-bold text-xl">Programs & Features</h1>
          <div className="flex justify-between align-center">
            <p className="mb-7">Amazon Prime</p>
            <KeyboardArrowRight
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
          <div className="flex justify-between align-center">
            <p className="mb-7">Savings Programs</p>
            <KeyboardArrowRight
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
          <div className="flex justify-between align-center">
            <p className="mb-7">Gifts Cards</p>
            <KeyboardArrowRight
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
          <div className="flex justify-between align-center">
            <p className="mb-7">Boutiques Francophones</p>
            <KeyboardArrowRight
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
          <div className="flex">
            <p className="mb-7">See All</p>
            <KeyboardArrowDown
              fontSize="medium"
              className="text-gray-500 ml-3 "
            />
          </div>
        </div>
        <div className="bg-white pr-5 pt-5 pb-5 pl-10 flex flex-col border-b mb-10 border-gray-300 ">
          <h1 className="mb-7 font-bold text-xl">Helps & Settings</h1>
          <div className="flex justify-between align-center">
            <p className="mb-7">Your Account</p>
          </div>
          <div className="flex align-center">
            <LanguageOutlined fontSize="medium" className="text-gray-500 " />
            <p className="mb-7 ml-3">English</p>
          </div>
          <div className="flex align-center ">
            <div className="text-xs">
              <Image
                src="https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="image"
                width={20}
                height={20}
              />
            </div>

            <p className="mb-7 ml-3">Nigeria</p>
          </div>
          <div className="flex justify-between align-center">
            <p className="mb-7">Help</p>
          </div>

          {session && (
              <button onClick={signOut} className='flex focus:outline-none'>
                <p className='mb-7'>Sign Out</p>
              </button>
            )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Sidebar;
