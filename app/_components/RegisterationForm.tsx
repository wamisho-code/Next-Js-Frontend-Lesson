'use client'

import { useForm } from "react-hook-form"
import { RegisterData, registerSchema } from "../schema/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegisterMutation } from "../_api/authApi"
import { useRouter } from "next/navigation"

export default function RegisterForm(){
  const [registerUser,{isLoading,error}]=useRegisterMutation();
  const router =useRouter()
  const {register,handleSubmit,formState:{errors}} = useForm<RegisterData>({
    resolver:zodResolver(registerSchema),
    defaultValues:{
      FullName:"",
      Email:"",
      Password:"",
      Phone:"",
    }
  })
  const handleRegistration= async (data:RegisterData)=>{
        try{
          const result =await registerUser({
            fullName: data.FullName,
            email: data.Email,
            phone: data.Phone,
            password: data.Password,
          }).unwrap();
          router.push("/auth/login")

        }catch(error){
          console.log(`Url: ${process.env.NEXT_PUBLIC_API_URL}`)
          console.log(error);
        }
      }
    return(
        <form
        method="POST" 
        onSubmit={handleSubmit(handleRegistration)}
        className="w-full max-w-md space-y-5 rounded-2xl 
        border border-slate-200 bg-white p-8 shadow-lg">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Full Name
        </label>
        <input
          {...register("FullName")}
          type="text"
          placeholder="Enter your full name"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
        />
        {errors.FullName && <p className="text-red-700">{errors.FullName.message}</p>}
      </div>

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
          Phone
        </label>
        <input
          {...register("Phone")}
          type="tel"
          placeholder="09/07-xx-xx-xx-xx"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
        />
        {errors.Phone && <p className="text-red-700">{errors.Phone.message}</p>}

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
      >
        Create Account
      </button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <a href="/auth/login" className="font-semibold text-blue-950 hover:underline">
          Login
        </a>
      </p>

    </form>
    )
}