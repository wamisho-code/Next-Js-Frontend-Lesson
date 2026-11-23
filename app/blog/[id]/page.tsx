"use client"
import FetchBlogDetail from "@/app/fetchBlog/fetchBlogDetail";
import FetchMyBlogs from "@/app/fetchBlog/fetchBlogDetail";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";


export default function BlogDetail(){
      //const user = useSelector((state: RootState) => state.auth.user);
    const params= useParams()
    const id= Number(params.id)
    
    return (
        <FetchBlogDetail id={id}/>
    );
}