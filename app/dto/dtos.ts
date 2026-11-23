export interface LoginRequestDto{
    email:string;
    password:string;
}
export interface RegisterDto{
    fullName:string;
    email:string;
    password:string;
    phone:string;
}
export interface LoginReponseDto{
    accessToken:string;
    tokenType:string;
    expiresAt:string;
}
export interface UserProfile{
    id:string;
    email:string;
    fullName:string;
    role?:string;
}
export interface UserPayload {
    id: string;
    email: string;
    name?: string;
    role?: string;
    exp: number;
}
export interface BlogCreatedDto{
    title:string;
    message:string;
}
export interface PostBlogDto{
    title:string,
    content:string,
    imageUrl:string,
}
export interface User {
    id: number;
    fullName: string;
    email: string;
    phone:string;
}
export interface Blog {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    likes: number;
    userId: number;
    user: User;
    createdAt: string;
    updatedAt: string;
}