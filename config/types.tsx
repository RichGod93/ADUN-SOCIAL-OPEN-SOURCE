import type { Client as Appwrite } from "appwrite";

type User = {
    $id: string;
    email: string;
    name: string;
};

type State = {
    user?: User;
    appwrite?: Appwrite;
};

export type {
    User,
    State
};