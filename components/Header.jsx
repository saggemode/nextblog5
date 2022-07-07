import { signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";
import { Menu } from "@headlessui/react";
import { Search, ShoppingCart } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/router";
import DropdownLink from "./DropdownLink";
import Link from "next/link";

const Header = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
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
      <div className="flex items-center bg-gray-300 p-1 flex-row py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600"
            width={150}
            height={40}
            alt="no inage"
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        {/* Search */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-red-400 hover:bg-red-500">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <Search className="h-12 p-4" />
        </div>
        {/* Right */}
        <div className=" text-gray-600 flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          {status === "loading" ? (
            "A"
          ) : session?.user ? (
            <Menu as="div" className="relative inline-block">
              <Menu.Button className="text-blue-600">
                <div className="link">
                  <p>
                    Hello,{" "}
                    {session ? (
                      <span className="text-gray-100 font-bold">
                        {session.user.name.split(" ")[0]}
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </p>
                  <p className="font-extrabold md:text-sm">Account & Lists</p>
                </div>
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

          {/* <div className="link">
            <p>
              Hello,
              <span className="text-gray-100 font-bold text-sm">
              {session.user.name.split(" ")[0]}
              </span>
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div> */}

          <div
            onClick={() => router.push("/cart")}
            className="relative link flex items-center"
          >
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-red-400 text-center rounded-full font-bold text-black">
                {cartItemsCount}
              </span>
            )}

            <ShoppingCart className="h-10" />
            <p className="hidden font-extrabold md:text-sm md:inline mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
