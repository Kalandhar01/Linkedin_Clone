// lib/appwrite.ts

import { Client, Databases, ID, Storage } from "node-appwrite";

// A more robust check to ensure environment variables are set
if (
  !process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
  !process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ||
  !process.env.APPWRITE_API_KEY
) {
  throw new Error("ERROR: Missing required Appwrite environment variables.");
}

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const storage = new Storage(client); // Initialize the Storage service

// Export all necessary services
export { databases, ID, storage };
