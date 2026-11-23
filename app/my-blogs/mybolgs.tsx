"use client"

import { useSelector } from "react-redux"
import { useDeleteBlogMutation, useGetSpecificBlogQuery, useGetUserBlogsQuery } from "../_api/blogApi"
import { RootState } from "../_redux/store";
import { getRelativeTime } from "../_utils/getRelativeTime";
import { tr } from "zod/locales";
import toast from "react-hot-toast";
export default function MyBlogs(){
    const user= useSelector((state:RootState)=>state.auth.user);
    const [deleteBlog,{isLoading:isDeleting ,isError:isDeleteError,error:errorDelete}]=useDeleteBlogMutation();

    if (user == null) {
            return (
                <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4">
                <p className="text-slate-600">Please login to see your blogs</p>
                </div>
            );
            }
    
    const {data:blogs,isLoading,isError,error}= useGetUserBlogsQuery(Number(user?.id))

    if (isLoading) {
            return <p>Loading Blogs ...</p>;
            }

    if (isError) {
        const statusCode = "status" in error ? error.status : null;
        console.log(error);

        if (statusCode === 401) {
            return (
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4">
                <p className="text-slate-600">Please login to view your blogs</p>
            </div>
            );
        }

        return (
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4">
            <p className="text-red-600">Something went wrong</p>
            </div>
        );
    }
    if(blogs?.length===0 || !blogs)
        return (
        <div className="rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-slate-600">You have't posted any blog</p>
        
        </div>
    );
    return (
         <div 
    className="m-10  grid grid-cols-1 
    gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
            <article
                // onClick={()=>{router.push(`/blog/${blog.id}`)}}
                key={blog.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
                <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="h-48 w-full object-cover"
                />

                <div className="space-y-3 p-5">
                    <h2 className="text-lg font-bold text-slate-800">
                        {blog.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-slate-200 pb-4 text-sm text-slate-500">
                        <p>
                            Posted:{" "}
                            <time dateTime={blog.createdAt}>
                                {getRelativeTime(blog.updatedAt)}
                            </time>
                        </p>
                    </div>

                    <p className="line-clamp-3 text-sm text-slate-600">
                        {blog.content}
                    </p>
                    
                        <button
                            onClick={async ()=>{
                                try{
                                    var blogId= Number(blog.id);
                                    var result= await deleteBlog(blogId).unwrap();
                                    if(result==true){
                                        toast.success("Blog deleted successfully")
                                    }else{
                                        toast.error("Blog Not found");
                                    }

                                }catch(error){
                                    toast.error("Something went wrong");
                                    console.log(errorDelete);
                                }
                            }}
                            type="button"
                            className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                            {
                                isDeleting ? "Deleting...":"Delete"
                            }
                        </button>

                    
                </div>
            </article>
        ))}
    </div>
 
    );
    
}