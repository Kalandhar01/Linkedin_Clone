// actions/createPostAction.ts
"use server";

import { databases, storage, ID } from "@/lib/appwrite"; // Assuming you have this client setup
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createNewPost(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const postText = formData.get("postText") as string;
  const imageFile = formData.get("image") as File | null;
  let imageUrl: string | undefined;

  if (!postText.trim()) {
    throw new Error("Post text cannot be empty");
  }

  // Upload image to Appwrite Storage if it exists
  if (imageFile && imageFile.size > 0) {
    try {
      const fileId = ID.unique();
      const uploadedFile = await storage.createFile(
        process.env.APPWRITE_STORAGE_BUCKET_ID!,
        fileId,
        imageFile
      );
      // Construct the public URL for the image
      imageUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_STORAGE_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
    } catch (error) {
      console.error("Failed to upload image:", error);
      throw new Error("Could not upload image.");
    }
  }

  // Create a new post document in the Appwrite Database
  try {
    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_POSTS_COLLECTION_ID!,
      ID.unique(),
      {
        text: postText,
        imageUrl: imageUrl,
        userId: user.id,
        userFirstName: user.firstName || "User",
        userLastName: user.lastName || "",
        userImage: user.imageUrl,
      }
    );
  } catch (error) {
    console.error("Failed to create post document:", error);
    throw new Error("Could not save post to the database.");
  }

  // Revalidate the Home page path to show the new post
  revalidatePath("/");
}