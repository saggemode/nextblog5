import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import Footer from "../../Footer";
import Navbar from "../Navbar/Navbar";

const Layout = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - Tochi Store" : "Tochi Store"}</title>
        {description && <meta name="description" content={description}></meta>}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between  ">
        <div className=" top-0 z-40">
          {/* <div className='sticky top-0 z-40'> */}
          <Navbar />
        </div>

        {/* <SubNavbar/> */}
        <main className="container m-auto mt-4 px-4">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
