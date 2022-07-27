import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { getError } from "../utils/errors";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import Layout from "../components/common/Layout/Layout";

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: "" };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "LOGIN_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

const LoginScreen = () => {
  const { data: session } = useSession();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      dispatch({ type: "LOGIN_REQUEST" });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS" });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 5,
                message: "password should be more than 4 chars",
              },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4 ">
          <button className="primary-button">
            {!loading ? "Loading.." : "Login"}
          </button>
          {!loading && <CircularProgress />}
        </div>
        <div className="mb-4 ">
          Don&apos;t have an account? &nbsp;
          <Link href={`/register?redirect=${redirect || "/"}`}>Register</Link>
        </div>
      </form>
    </Layout>
  );
};

export default LoginScreen;
