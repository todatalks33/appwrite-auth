import { INewUser, User } from "@/types";
import {ID} from 'appwrite'
import { account } from "./config";
export async function createUserAccount(user:INewUser){
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        return newAccount
    } catch (error) {
        console.log('something went wrong in creating account')
    }
}
export async function loginUserAccoutn(user:User){
    try {
        const newAccount = await account.createEmailSession(
            user.email,
            user.password,
        )
        return newAccount
    } catch (error) {
        console.log('something went wrong in login',error)
    }
}

export async function logoutUserAccount(){
    try {
        const newAccount = await account.deleteSession('current')
        return newAccount
    } catch (error:any) {
        console.log('something went wrong in logout')
    }

}

export async function getCurrentUser(){
    try {
        const user = await account.get()
        return user
    } catch (error:any) {
        console.log('account not found')
    }
}