import { Client,Account,Avatars,ID } from "appwrite";


const client = new Client();
client.setProject('654369da93ad379b9eb7');
client.setEndpoint('https://cloud.appwrite.io/v1');

export const account = new Account(client);
export const avatars = new Avatars(client);