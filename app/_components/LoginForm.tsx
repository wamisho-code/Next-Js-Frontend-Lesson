"use client"

import { useForm } from "react-hook-form"
import { LoginData, loginSchema } from "../schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../_api/authApi";
import { decodeToken } from "../_utils/decodeToken";
import { setCredentials } from "../_redux/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../_redux/store";
import { useRouter } from "next/navigation";

export default function LoginForm(){
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const [login,{isLoading,error}]=useLoginMutation()
  const {register,handleSubmit,formState:{errors}}= useForm<LoginData>({
    resolver:zodResolver(loginSchema),
    defaultValues:{
      Email:"",
      Password:""
    }
  });
  const handleLogin= async(data:LoginData)=>{
          try{
            const result= await login({
              email:data.Email,
              password: data.Password,
            }).unwrap();
            const user = decodeToken(result.accessToken);

            localStorage.setItem("accessToken", result.accessToken);

            dispatch(setCredentials({
                token: result.accessToken,
                user: user,
            }));

            router.push("/")
          }catch(error){
            console.log(error)
          }
  }
    return(
        <form 
        method="POST" 
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-md space-y-5 rounded-2xl 
        border border-slate-200 bg-white p-8 shadow-lg">

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Email Address
        </label>
        <input
        {...register("Email")}
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
        />
        {errors.Email && <p className="text-red-700">{errors.Email.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Password
        </label>
        <input
        {...register("Password")}
          type="password"
          placeholder="Create a password"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
        />
        {errors.Password && <p className="text-red-700">{errors.Password.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-950 py-3 font-semibold text-white transition hover:bg-blue-800"
      >Login
      </button>

      <p className="text-center text-sm text-slate-500">
        <a href="/auth/register" className="font-semibold text-blue-950 hover:underline">
        Create account
        </a>
      </p>

    </form>
    )
}