import Head from "next/head";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../ui/Footer";
import Header from "../ui/Navbar";

const Layout = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - Tochi Store" : "Tochi Store"}</title>
        {description && <meta name="description" content={description}></meta>}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <Header />
        <main className="container m-auto mt-4 px-4">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
