import { signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";
import Link from "next/link";

const Header = () => {
  const { status, data: session } = useSession();
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
                <DropdownLink
                  className="dropdown-link"
                  href="/order-history"
                >
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
  </header> 
  );
};

export default Header;
