import { baseApi } from "../_redux/baseApi";
import { Blog, BlogCreatedDto, PostBlogDto } from "../dto/dtos";

export const blogApi =baseApi.injectEndpoints({
    endpoints:(builder)=>({
        postBlog:builder.mutation<BlogCreatedDto,PostBlogDto>({
            query:(postBlogData)=>({
                url:"/blog/post",
                method:"POST",
                body:postBlogData
            }),
            invalidatesTags:["Blog"],
        
        }),
        getBlogs:builder.query<Blog[],void>({
            query:()=>"/blog/all"
        }),
        getSpecificBlog:builder.query<Blog,number>({
            query:(id)=>`/blog/${id}`
        }),
        getUserBlogs:builder.query<Blog[],number>({
            query:(id)=>`/blog/my-blogs/${id}`
        }),
        deleteBlog:builder.mutation<boolean,number>({
            query:(id)=>({
               url: `/blog/delete/${id}`,
               method:"DELETE",
            }),
            invalidatesTags:["Blog"]
        })

    })

})
export const{
    usePostBlogMutation,
    useGetBlogsQuery,
    useGetSpecificBlogQuery,
    useGetUserBlogsQuery,
    useDeleteBlogMutation,
}=blogApi;