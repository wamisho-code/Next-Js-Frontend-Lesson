"use client"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../_redux/store"
import { use } from "react"
import { useRouter } from "next/navigation"
import { logout } from "../_redux/authSlice"
import { baseApi } from "../_redux/baseApi"

export default function UserInfoDetails(){
    const user= useSelector((state:RootState)=>state.auth.user)
    const dispatch= useDispatch()
    const router= useRouter()
    const logOut=()=>{
        localStorage.removeItem("accessToken");
        dispatch(logout())
        dispatch(baseApi.util.resetApiState());
        router.push("/")

    }
    
    if (!user) {
        return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4">
            <p className="text-slate-600">Please login to view your account.</p>
        </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-2xl">
            {/* Page Title */}
            <h1 className="mb-6 text-3xl font-bold text-slate-900">Account</h1>

            {/* Account Details Card */}
            <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            {/* Avatar / Header */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-950 text-xl font-bold text-white uppercase">
                {user.name?.charAt(0) || "U"}
                </div>
                <div>
                <h2 className="text-xl font-semibold text-slate-900">
                    {user.name}
                </h2>
                <p className="text-sm text-slate-500">Personal Information</p>
                </div>
            </div>

            {/* Info Rows */}
            <div className="space-y-4">
                <div className="flex flex-col justify-between rounded-lg bg-slate-50 p-4 sm:flex-row sm:items-center">
                <span className="text-sm font-medium text-slate-500">Name</span>
                <span className="font-semibold text-slate-900">{user.name}</span>
                </div>

                <div className="flex flex-col justify-between rounded-lg bg-slate-50 p-4 sm:flex-row sm:items-center">
                <span className="text-sm font-medium text-slate-500">Email</span>
                <span className="font-semibold text-slate-900">{user.email}</span>
                </div>
            </div>

            {/* Logout Action */}
            <div className="border-t border-slate-200 pt-6">
                <button
                type="button"
                onClick={logOut}
                className="cursor-pointer rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-800"
                >
                Logout
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}