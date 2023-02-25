import { Client as Appwrite, Account, Databases } from "appwrite";
import { atom } from 'recoil';
import { User } from "./types";

export const Server = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '',
    project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '',
};

export const client = new Appwrite().setEndpoint(Server.endpoint).setProject(Server.project);

const account = new Account(client);
// const database = new Databases(client, Server.databaseID);

export const appwrite = { account };

export const userState = atom<User>({
    key: "user",
    default: {
        $id: "",
        name: "",
        email: ""
    }
});
