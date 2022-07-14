import Link from "next/link";
import React, { useReducer } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../../components/Layout";
import { getError } from "../../utils/errors";
//import { imageConstants } from "../../components/constants";

function reducer(state, action) {
  switch (action.type) {
    case "PRODUCT_REQUEST":
      return { ...state, loading: true, error: "" };
    case "PRODUCT_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "PRODUCT_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}

const RegisterScreen = () => {
  const [{ loadingUpload }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({
    name,
    slug,
    price,
    image,
    category,
    brand,
    countInStock,
    description,
  }) => {
    try {
      await axios.post("/api/auth/product", {
        name,
        slug,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      });
      dispatch({ type: "PRODUCT_SUCCESS" });
      toast.success("Product Create successfully");
    } catch (err) {
      dispatch({ type: "PRODUCT_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const uploadHandler = async (e, imageField = "image") => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const {
        data: { signature, timestamp },
      } = await axios("/api/admin/cloudinary-sign");

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: "UPLOAD_SUCCESS" });
      setValue(imageField, data.secure_url);
      toast.success("File uploaded successfully");
    } catch (err) {
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Create New Product">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link href="/admin/products">
                <a className="font-bold">Products</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="mb-4 text-xl">Create Product</h1>
            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="w-full"
                id="name"
                autoFocus
                {...register("name", {
                  required: "Please enter name",
                })}
              />
              {errors.name && (
                <div className="text-red-500">{errors.name.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                className="w-full"
                id="slug"
                {...register("slug", {
                  required: "Please enter slug",
                })}
              />
              {errors.slug && (
                <div className="text-red-500">{errors.slug.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="w-full"
                id="price"
                {...register("price", {
                  required: "Please enter price",
                })}
              />
              {errors.price && (
                <div className="text-red-500">{errors.price.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="image">image</label>
              <input
                type="text"
                className="w-full"
                id="image"
                {...register("image", {
                  required: "Please enter image",
                })}
              />
              {errors.image && (
                <div className="text-red-500">{errors.image.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="imageFile">Upload image</label>
              <input
                type="file"
                className="w-full"
                id="imageFile"
                onChange={uploadHandler}
              />

              {loadingUpload && <div>Uploading....</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="category">category</label>
              <input
                type="text"
                className="w-full"
                id="category"
                {...register("category", {
                  required: "Please enter category",
                })}
              />
              {errors.category && (
                <div className="text-red-500">{errors.category.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="brand">brand</label>
              <input
                type="text"
                className="w-full"
                id="brand"
                {...register("brand", {
                  required: "Please enter brand",
                })}
              />
              {errors.brand && (
                <div className="text-red-500">{errors.brand.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="countInStock">countInStock</label>
              <input
                type="text"
                className="w-full"
                id="countInStock"
                {...register("countInStock", {
                  required: "Please enter countInStock",
                })}
              />
              {errors.countInStock && (
                <div className="text-red-500">
                  {errors.countInStock.message}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="countInStock">description</label>
              <input
                type="text"
                className="w-full"
                id="description"
                {...register("description", {
                  required: "Please enter description",
                })}
              />
              {errors.description && (
                <div className="text-red-500">{errors.description.message}</div>
              )}
            </div>

            <div className="mb-4">
              <button className="primary-button">Create</button>
            </div>
            <div className="mb-4">
              <Link href={`/admin/products`}>Back</Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterScreen;
