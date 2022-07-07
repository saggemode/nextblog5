import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { MenuIcon } from "@heroicons/react/outline";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";
import DropdownLink from "./DropdownLink";
import Sidebar from "./Sidebar";

const Header = () => {
  const { status, data: session } = useSession();
  const [showSignOut] = useState(false);

  const [showSideBar, setShowSideBar] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };
  return (
    <header>
      {showSideBar && (
        <div className="hidden sm:flex fixed z-50 w-full top-0 bg-black bg-opacity-70 h-screen">
          <Sidebar setShowSideBar={setShowSideBar} />
        </div>
      )}
      <nav className="flex h-12 items-center px-4 justify-between shadow-md">
        <Link href="/">
          <a className="text-lg font-bold">Tochi Store</a>
        </Link>
        <div>
          <Link href="/cart">
            <a className="p-2">
              Cart
              {cartItemsCount > 0 && (
                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </a>
          </Link>
          {status === "loading" ? (
            "A"
          ) : session?.user ? (
            <Menu as="div" className="relative inline-block">
              <Menu.Button className="text-blue-600">
                {session.user.name.split(" ")[0]}
              </Menu.Button>
              <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/profile">
                    Profile
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/order-history">
                    Order History
                  </DropdownLink>
                </Menu.Item>
                {session.user.isAdmin && (
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/admin/dashboard"
                    >
                      Admin Dashboard
                    </DropdownLink>
                  </Menu.Item>
                )}
                <Menu.Item>
                  <a
                    className="dropdown-link"
                    href="#"
                    onClick={logoutClickHandler}
                  >
                    Logout
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link href="/login">
              <a className="p-2">Login</a>
            </Link>
          )}
        </div>
      </nav>

      <div className=" bg-white flex text-amazon_blue space-x-3 p-2 pl-6 whitespace-nowrap items-center text-xs">
        <p
          onClick={() => setShowSideBar(true)}
          className="link flex items-center "
        >
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="hover_animation shadow-xl p-2 rounded-xl">Prime Video</p>
        <p className="hover_animation shadow-xl p-2 rounded-xl">
          Tochi Business
        </p>
        <p className="hover_animation shadow-xl p-2 rounded-xl">Today Deals</p>
        <p className="hidden hover_animation shadow-xl p-2 rounded-xl lg:inline-flex">
          Electronis
        </p>
        <p className="hidden hover_animation shadow-xl p-2 rounded-xl lg:inline-flex">
          Food & Grocery
        </p>
        <p className="hidden hover_animation shadow-xl p-2 rounded-xl lg:inline-flex">
          Prime
        </p>
        <p className="hidden hover_animation shadow-xl p-2 rounded-xl lg:inline-flex">
          Buy Again
        </p>
        <p className="hidden hover_animation shadow-xl p-2 rounded-xl lg:inline-flex">
          Shopper Toolkit
        </p>
        <p className="hidden hover_animation shadow-xl p-2 rounded-xl lg:inline-flex">
          Health & Personal Care
        </p>
        {session
          ? showSignOut && (
              <div
                onClick={signOut}
                className="absolute hover:cursor-pointer right-10 bg-white rounded-sm shadow-lg p-2 text-amazon_blue font-bold"
              >
                <p>Sign Out</p>
              </div>
            )
          : ""}
      </div>
    </header>
  );
};

export default Header;
