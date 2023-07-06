import axios from "axios";
import cogoToast from "cogo-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../../components/Layout";
import MetaTag from "../../../components/MetaTag";
import { getError } from "../../../utils/errors";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    default:
      return state;
  }
}

const AdminCategoryEditScreen = () => {
  const { query } = useRouter();
  const categoryId = query.id;
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/categories/${categoryId}`);
        dispatch({ type: "FETCH_SUCCESS" });
        setValue("name", data.name);
        setValue("slug", data.slug);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, [categoryId, setValue]);

  const router = useRouter();

  const submitHandler = async ({ name, slug }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/admin/categories/${categoryId}`, {
        name,
        slug,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      cogoToast.success("Category updated successfully");
      router.push("/admin/categories");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
      cogoToast.error(getError(err));
    }
  };
  return (
    <Layout>
      <MetaTag
        title={`Edit Post ${categoryId}`}
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
              <Link href="/admin/posts">
                <a className="font-bold">Posts</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/categories">Category</Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          {loading ? (
            <div>loading</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="flex justify-center">
                <div className="w-1/2 flex flex-col pb-12">
                  <h1 className="mb-4 text-xl">Create New Post</h1>

                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Title
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="blog title"
                      autoFocus
                      {...register("name", {
                        required: "Please enter title",
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminCategoryEditScreen;
AdminCategoryEditScreen.auth = { adminOnly: true };
