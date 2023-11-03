import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query'
import { createUserAccount, loginUserAccoutn } from '../appwrite/api'
import { INewUser, User } from '@/types'

export const useCreateUserAccount = ()=>{
    return useMutation({
        mutationFn: (user:INewUser)=> createUserAccount(user)
    })
}

export const useSigninAccount = ()=>{
    return useMutation({
        mutationFn: (user:User)=> loginUserAccoutn(user)
    })
}