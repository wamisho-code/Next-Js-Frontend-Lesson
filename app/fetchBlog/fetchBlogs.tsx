"use client"

import { useRouter } from "next/navigation";
import { useGetBlogsQuery } from "../_api/blogApi";
import { getRelativeTime } from "../_utils/getRelativeTime";

export default  function FetchBlogs(){
    const {data:blogs,isLoading,isError,error}=  useGetBlogsQuery()
    const router = useRouter()
    if(isLoading)
        return <p>Loading...</p>
    if (isError) {
        console.log("Error fetching blogs:", error);
        return <p>Something went wrong</p>;
    }
    if(blogs?.length===0 || !blogs)
        return (
        <div className="rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-slate-600">No blogs found yet.</p>
        </div>
        );
    
    return (
    <div 
    className="m-10  grid grid-cols-1 
    gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
            <article
                onClick={()=>{router.push(`/blog/${blog.id}`)}}
                key={blog.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
                <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="h-89 w-full object-cover"
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
                            <h1 className="text-md"> {`From: ${blog.user.fullName}`}</h1>
                    </div>

                    <p className="line-clamp-3 text-sm text-slate-600">
                        {blog.content}
                    </p>
                </div>
            </article>
        ))}
    </div>
    );
}