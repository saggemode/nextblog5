import { Checkbox, CircularProgress } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Layout from "../../../components/common/Layout/Layout";
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

const AdminUserEditScreen = () => {
  const { query } = useRouter();
  const userId = query.id;
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/users/${userId}`);
        dispatch({ type: "FETCH_SUCCESS" });
        setValue("name", data.name);
        //setValue("image", data.image);
        setIsAdmin(data.isAdmin);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, [userId, setValue]);

  const router = useRouter();

  //   const uploadHandler = async (e, imageField = "image") => {
  //     const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
  //     try {
  //       dispatch({ type: "UPLOAD_REQUEST" });
  //       const {
  //         data: { signature, timestamp },
  //       } = await axios("/api/admin/cloudinary-sign");

  //       const file = e.target.files[0];
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       formData.append("signature", signature);
  //       formData.append("timestamp", timestamp);
  //       formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
  //       const { data } = await axios.post(url, formData);
  //       dispatch({ type: "UPLOAD_SUCCESS" });
  //       setValue(imageField, data.secure_url);
  //       toast.success("File uploaded successfully");
  //     } catch (err) {
  //       dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
  //       toast.error(getError(err));
  //     }
  //   };

  const submitHandler = async ({ name, isAdmin }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/admin/users/${userId}`, {
        name,
        isAdmin,
        //image,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("User updated successfully");
      router.push("/admin/users");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };
  return (
    <Layout title={`Edit User ${userId}`}>
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
              <Link href="/admin/products">Products</Link>
            </li>
            <li>
              <Link href="/admin/users">
                <a className="font-bold">Users</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          {loading ? (
            <div>{loading && <CircularProgress></CircularProgress>}</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 text-xl">{`Edit User ${userId}`}</h1>
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

              {/* <div className="mb-4">
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
              </div> */}

              <div className="mb-4">
                <label htmlFor="IsAdmin">is Admin</label>
                <Checkbox
                  onClick={(e) => setIsAdmin(e.target.checked)}
                  checked={isAdmin}
                  name="isAdmin"
                />
              </div>

              <div className="mb-4">
                <button disabled={loadingUpdate} className="primary-button">
                  {loadingUpdate ? "Loading" : "Update"}
                </button>
                {loadingUpdate && <CircularProgress />}
              </div>
              <div className="mb-4">
                <Link href={`/admin/products`}>Back</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

// export async function getServerSideProps({ params }) {
//   return {
//     props: { params },
//   };
// }

export default AdminUserEditScreen;
AdminUserEditScreen.auth = { adminOnly: true };
