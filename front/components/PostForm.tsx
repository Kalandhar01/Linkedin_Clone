"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Using Textarea for multi-line posts
import { useUser } from "@clerk/nextjs";
import { ImageIcon, XIcon } from "lucide-react";
import React, { useRef, useState } from "react";

const PostForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, isLoaded } = useUser();

  const [postText, setPostText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Function to trigger the hidden file input
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Function to handle the selected file and create a preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Main submission logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you'd use FormData to send both text and image
    const formData = new FormData();
    formData.append("postText", postText);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    console.log("Submitting with FormData:", formData.get("postText"), formData.get("image"));
    
    // Reset form after submission
    setPostText("");
    setImageFile(null);
    setImagePreview(null);
    formRef.current?.reset();
  };

  if (!isLoaded) {
    return <div>Loading...</div>; // Provide a loading state
  }

  return (
    <div className="p-4 bg-white rounded-lg border">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <Textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Start writing a post..."
            className="flex-1 outline-none border rounded-md p-2"
          />
        </div>

        {/* Conditionally render the image preview */}
        {imagePreview && (
          <div className="relative w-full">
            <img src={imagePreview} alt="Post preview" className="rounded-md w-full object-contain" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 rounded-full h-8 w-8"
              onClick={() => {
                setImagePreview(null);
                setImageFile(null);
              }}
            >
              <XIcon size={16} />
            </Button>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex justify-between items-center">
          <Button type="button" variant="ghost" onClick={handleImageButtonClick}>
            <ImageIcon className="mr-2" size={20} />
            Photo
          </Button>

          {/* Hidden file input, triggered by the button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />

          <Button type="submit" disabled={!postText.trim() && !imageFile}>
            Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;