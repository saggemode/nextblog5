import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import cogoToast from "cogo-toast";
import axios from "axios";

import { getError } from "../../utils/errors";
import Layout from "../../components/Layout";
import MetaTag from "../../components/MetaTag";
import { blogConstant } from "../../client/constants";
import { useRouter } from "next/router";

function reducer(state, action) {
  switch (action.type) {
    case blogConstant.POST_REQUEST:
      return { ...state, loading: true, error: "" };
    case blogConstant.POST_SUCCESS:
      return { ...state, loading: false, error: "" };
    case blogConstant.POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case blogConstant.UPLOAD_REQUEST:
      return { ...state, loadingUpload: true, errorUpload: "" };
    case blogConstant.UPLOAD_SUCCESS:
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case blogConstant.UPLOAD_FAIL:
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}
const CreateCategory = () => {
  const { data: session } = useSession();
  const [{ loadingUpload }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (!session?.user) {
      router.push(redirect || "/login");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name }) => {
    try {
      await axios.post("/api/auth/category", {
        name,
        //slug,
      });
      dispatch({ type: blogConstant.POST_SUCCESS });
      cogoToast.success("Slug Create successfully");
    } catch (err) {
      dispatch({ type: blogConstant.POST_FAIL, payload: getError(err) });
      cogoToast.error(getError(err));
    }
  };

  return (
    <Layout>
      <MetaTag
        title={"Create Category"}
        description={"A Full Stack Developer who try to write technical blogs."}
        siteUrl={"https://next-ecomtailwin.vercel.app/"}
        previewImage={
          "https://next-ecomtailwin.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fnext-ecom-tailwind%2Fimage%2Fupload%2Fv1657406132%2Fppdbacwi02hqwbwhttjp.jpg&w=1920&q=75"
        }
      />
      <div className="grid md:grid-cols-4 md:gap-5 pt-20">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link href="/admin/posts">Posts</Link>
            </li>
            <li>
              <Link href="/admin/categories">
                <a className="font-bold"> Categories</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex justify-center">
              <div className="w-1/2 flex flex-col pb-12">
                <h1 className="mb-4 text-xl">Create New Post</h1>

                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Category name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="blog Categpry"
                    autoFocus
                    {...register("name", {
                      required: "Please enter Category name",
                    })}
                  />
                  {errors.name && (
                    <div className="text-red-500">{errors.name.message}</div>
                  )}
                </div>

                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
