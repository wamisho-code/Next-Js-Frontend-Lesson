"use client"
import { useForm } from "react-hook-form"
import { BlogData, postBlogSchema } from "../schema/postBlogSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePostBlogMutation } from "../_api/blogApi"
import { PostBlogDto } from "../dto/dtos"
import toast from "react-hot-toast"

export default  function PostBlog(){
    const [postBlog, { data, isLoading, isError, error, isSuccess }] =
        usePostBlogMutation();
    const {register,handleSubmit,formState:{errors}}= useForm<BlogData>({
        resolver:zodResolver(postBlogSchema),
        defaultValues:{
            Title:"",
            Content:"",
            ImageUrl:""
        }
    })
    const handlePost= async(data:BlogData)=>{
            try{
                const postBlogDto:PostBlogDto={
                    title:data.Title,
                    content:data.Content,
                    imageUrl:data.ImageUrl
                } 
                const result= await postBlog(postBlogDto).unwrap();
                toast.success(result.message);
            }catch(error){
                 console.log("error:", error);                         // expandable object in the console
                console.log("error:", JSON.stringify(error, null, 2)); 
                toast.error("Error");
            }
    }
    return(
        <form onSubmit={handleSubmit(handlePost)}
        className="w-full max-w-md space-y-5 rounded-2xl border
         border-slate-200 bg-white p-8 shadow-lg">
            <div  className="space-y-2">
                <h1 className="font-bold text-slate-700">Create Your Blog</h1>
            </div>
            <div className="space-y-2">
                <label className="text-lg font-bold text-slate-700">
                Blog Title
                </label>
                <input
                {...register("Title")}
                type="text"
                placeholder="Enter title"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                />
                {errors.Title && <p className="text-red-700">{errors.Title.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-md font-bold text-slate-700">
                Content
                </label>
                <textarea
                {...register("Content")}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                />
                {errors.Content && <p className="text-red-700">{errors.Content.message}</p>}

            </div>
            <div className="space-y-2">
                <label className="text-md font-bold text-slate-700">
                Image Url
                </label>
                <input
                {...register("ImageUrl")}
                type="tel"
                placeholder="https://...."
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
                />
                {errors.ImageUrl && <p className="text-red-700">{errors.ImageUrl.message}</p>}

            </div>
            
            <button
                type="submit"
                className="w-full rounded-lg bg-blue-950 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
                Post Blog
            </button>
    </form>
    )
}