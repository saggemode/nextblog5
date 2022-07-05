import Head from "next/head";
import React from "react";

const Layout = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - Tochi Store" : "Tochi Store"}</title>
        {description && <meta name="description" content={description}></meta>}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>heaer</header>

        <main>{children}</main>

        <footer className="flex h-10 justify-center items-center shadow-inner">
            
          <p>Copyright © 2022 Tochi Store</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
