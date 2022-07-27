import React, { useContext, useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import NextLink from "next/link";
//import { Avatar } from '@mui/material';
import Container from "../../ui/Container/Container";
import Searchbar from "../Searchbar/Searchbar";
import Logo from "../../ui/Logo/Logo";
import UserNav from "../UserNav/UserNav";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../../utils/errors";
import { ListItem, ListItemText } from "@mui/material";
import Cookies from "js-cookie";
import { Store } from "../../../utils/Store";
import { signOut, useSession } from "next-auth/react";

const Navbar = ({ links }) => {
  const [nav, setNav] = useState(false);
  const [categories, setCategories] = useState([]);

  const { data: session } = useSession();
  const { dispatch } = useContext(Store);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <Container clean className="mx-auto max-w-8xl px-6">
      <div className="sticky top-0 bg-primary z-40 transition-all duration-150 h-20 min-h-fit">
        <div className="relative flex flex-row justify-between py-4 md:py-4">
          <div className="flex items-center flex-1">
            <div onClick={() => setNav(!nav)} className="cursor-pointer">
              <AiOutlineMenu size={30} />
            </div>

            <Link href="/">
              <a
                className="cursor-pointer rounded-full border transform duration-100 ease-in-out"
                aria-label="Logo"
              >
                <Logo />
              </a>
            </Link>
            <nav className="hidden ml-6 space-x-4 lg:block">
              <Link href="/search">
                <a className="inline-flex items-center leading-6 transition ease-in-out duration-75 cursor-pointer text-accent-5">
                  All
                </a>
              </Link>
              {links?.map((l) => (
                <Link href={l.href} key={l.href}>
                  <a className="inline-flex items-center leading-6 transition ease-in-out duration-75 cursor-pointer text-accent-5">
                    {l.label}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar />
          </div>

          <div className="flex items-center justify-end flex-1 space-x-8">
            <UserNav />
          </div>
        </div>

        {/* Mobile Menu */}
        {/* Overlay */}
        {nav ? (
          <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
        ) : (
          ""
        )}

        {/* Side drawer menu */}
        <div
          className={
            nav
              ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
              : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
          }
        >
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={20}
            className="absolute right-4 top-4 cursor-pointer"
          />
          <h2 className="text-1xl p-4 underline">Shopping by category</h2>
          <nav>
            <ul className="flex flex-col p-4 text-gray-800">
              {categories.map((category) => (
                <NextLink
                  key={category}
                  href={`/search?category=${category}`}
                  passHref
                >
                  <ListItem button component="a" onClick={() => setNav(!nav)}>
                    <ListItemText primary={category}></ListItemText>
                  </ListItem>
                </NextLink>
              ))}

              {session?.user ? (
                <ListItem button component="a" onClick={logoutClickHandler}>
                  <ListItemText primary='Logout'></ListItemText>
                </ListItem>
              ) : (
                ""
              )}
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex pb-4 lg:px-6 lg:hidden">
        <Searchbar id="mobile-search" />
      </div>
    </Container>
  );
};

export default Navbar;
