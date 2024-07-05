import * as yup from "yup"


export const signupSchema = yup.object({
    username:yup.string().required(),
    email:yup.string().email().required(),
    password:yup.string().required().min(8).max(16)
})


export const signInSchema = yup.object({
    email:yup.string().email().required(),
    password:yup.string().required().min(8).max(16)
})