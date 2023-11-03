import { Client,Account,Avatars,ID } from "appwrite";


const client = new Client();
client.setProject(process.env.APPWRITE_URL!);
client.setEndpoint(process.env.APPWRITE_ID!);

export const account = new Account(client);
export const avatars = new Avatars(client);