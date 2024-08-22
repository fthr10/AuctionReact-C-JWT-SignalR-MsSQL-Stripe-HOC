import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const accountApi = createApi({
    reducerPath:"accountApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://localhost:7275/api/User/",
    }),
    endpoints:(builder) => ({
        signUp:builder.mutation({
            query:(userData) => ({
                url:"Register",
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:userData
            })
        })
    })

})

export const {useSignUpMutation} = accountApi 