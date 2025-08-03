// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const postText = formData.get("postText") as string;
    const imageFile = formData.get("image") as File | null;
    // For testing, we get user info from the form data
    const userId = formData.get("userId") as string;
    //... add other user fields if needed

    if (!userId) {
      return NextResponse.json({ error: "userId is required for testing" }, { status: 400 });
    }

    // ... (The rest of the logic is the same as your server action) ...
    // 1. Upload image if it exists
    // 2. Create document in database

    return NextResponse.json({ message: "Post created successfully!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}