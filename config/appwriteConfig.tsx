import { Client as Appwrite, Account, Databases } from "appwrite";

export const Server = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '',
    project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '',
};

export const client = new Appwrite().setEndpoint(Server.endpoint).setProject(Server.project);

const account = new Account(client);
const databases = new Databases(client);

export const appwrite = { account, databases };

export const APPWRITE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
export const POST_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID || '';
