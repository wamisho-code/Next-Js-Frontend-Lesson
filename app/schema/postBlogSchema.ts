import z from "zod";

export const postBlogSchema =z.object({
    Title: z.string().min(3,"Please enter Blog title").max(100,"Title can't be above 30 characters"),
    Content: z.string().min(3,"Please enter content").max(100000,"Character mustn't be above 100000 characters"),
    ImageUrl: z.string().min(3,"Please Provide image url").url()
})
export type BlogData = z.infer<typeof postBlogSchema>