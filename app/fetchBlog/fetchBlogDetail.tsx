"use client"
import { useGetSpecificBlogQuery } from "../_api/blogApi";
import { getRelativeTime } from "../_utils/getRelativeTime";
interface FetchMyBlogsProps{
    id:number;
}
export default function FetchBlogDetail({id}:FetchMyBlogsProps){
    const {data,isLoading,isError,error}= useGetSpecificBlogQuery(id)
    if(isLoading)
        return <p>Loading...</p>
    if (isError) {
        console.log("Error fetching blogs:", error);
        return <p>Something went wrong</p>;
    }
    if(data == null)
        return (
        <div className="rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-slate-600">No blogs found yet.</p>
        </div>
    );
      return (
            <div className="mx-auto my-10 w-full max-w-4xl px-4">
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <img
                    src={data.imageUrl}
                    alt={data.title}
                    className="h-150 w-full object-cover sm:h-150"
                />

                <div className="space-y-6 p-6 sm:p-8">

                    <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                        {data.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-slate-200 pb-4 text-sm text-slate-500">
                        <p>
                            Posted:{" "}
                            <time dateTime={data.createdAt}>
                                {getRelativeTime(data.updatedAt)}
                            </time>
                        </p>

                    </div>

                    <div className="whitespace-pre-wrap break-words text-base leading-8 text-slate-700">
                        {data.content}
                    </div>
                        <div className="flex flex-col items-start gap-y-2 border-b border-slate-200 pb-4 text-lg text-slate-500">
                            <p>{`Author: ${data.user.fullName}`}</p>
                            <p>{`Email: ${data.user.email}`}</p>
                            <p>{`Phone: ${data.user.phone}`}</p>
                        </div>



                </div>
            </article>
        </div>
    );
  
}