
import { baseApi } from "../_redux/baseApi";
import { LoginReponseDto, LoginRequestDto, RegisterDto } from "../dto/dtos";
export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginReponseDto, LoginRequestDto>({
            query: (loginData) => ({
                url: "/auth/login",
                method: "POST",
                body: loginData,
            }),
        }),

        register: builder.mutation<string, RegisterDto>({
            query: (registerData) => ({
                url: "/auth/register",
                method: "POST",
                body: registerData,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
} = authApi;
