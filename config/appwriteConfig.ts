import { Client, Account, Databases } from "appwrite";
import endpoint from './endpoints.config';

const client = new Client()
    .setEndpoint(endpoint.appwriteURL) // API Endpoint
    .setProject(endpoint.appwriteID); // Project ID

export const account = new Account(client);

// make use of this after databases have been created.
// export const databases = new Databases(client, "");