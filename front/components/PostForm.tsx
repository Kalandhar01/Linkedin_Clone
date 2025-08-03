// "use client";

// import { createNewPost } from "@/action/createPostAction";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { useUser } from "@clerk/nextjs";
// import { ImageIcon, XIcon } from "lucide-react";
// import React, { useRef, useState } from "react";
// import { ClipLoader } from "react-spinners";

// const PostForm = () => {
//   const formRef = useRef<HTMLFormElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const { user, isLoaded } = useUser();

//   const [postText, setPostText] = useState("");
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false); 

//   const handleImageButtonClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handlePost = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//   createNewPost("Kalandhar" , true);
    
    
    
//     // Disable form on submit

//     try {
//       const formData = new FormData();
//       formData.append("postText", postText);
//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       // Send the formData to your API endpoint
//       const response = await fetch("/api/posts", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create post");
//       }

//       // Reset form on successful submission
//       setPostText("");
//       setImageFile(null);
//       setImagePreview(null);
//       formRef.current?.reset();

//     } catch (error) {
//       console.error("Error creating post:", error);
//       // Optionally, show an error message to the user
//     } finally {
//       setIsSubmitting(false); // Re-enable form
//     }
//   };

//   if (!isLoaded) {
//     return (
//       <div className="flex justify-center items-center p-4">
//         <ClipLoader size={50} color={"#0B63C4"} />
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 bg-white rounded-lg border">
//       <form ref={formRef} onSubmit={handlePost} className="space-y-4">
//         {/* --- Form fields remain the same --- */}
//         <div className="flex items-start space-x-4">
//           <Avatar>
//             <AvatarImage src={user?.imageUrl} />
//             <AvatarFallback>
//               {user?.firstName?.charAt(0)}
//               {user?.lastName?.charAt(0)}
//             </AvatarFallback>
//           </Avatar>
//           <Textarea
//             value={postText}
//             onChange={(e) => setPostText(e.target.value)}
//             placeholder="Start writing a post..."
//             className="flex-1 outline-none border rounded-md p-2"
//             disabled={isSubmitting} // Disable textarea while submitting
//           />
//         </div>

//         {imagePreview && (
//           <div className="relative w-full">
//             <img src={imagePreview} alt="Post preview" className="rounded-md w-full object-contain" />
//             <Button
//               type="button"
//               variant="destructive"
//               size="icon"
//               className="absolute top-2 right-2 rounded-full h-8 w-8"
//               onClick={() => {
//                 setImagePreview(null);
//                 setImageFile(null);
//               }}
//               disabled={isSubmitting}
//             >
//               <XIcon size={16} />
//             </Button>
//           </div>
//         )}
        
//         <div className="flex justify-between items-center">
//           <Button type="button" variant="ghost" onClick={handleImageButtonClick} disabled={isSubmitting}>
//             <ImageIcon className="mr-2" size={20} />
//             Photo
//           </Button>
//           <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" hidden />

//           {/* Disable button while submitting and show a spinner */}
//           <Button type="submit" disabled={(!postText.trim() && !imageFile) || isSubmitting}>
//             {isSubmitting ? <ClipLoader size={20} color={"#ffffff"} /> : "Post"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PostForm;















// components/PostForm.tsx
"use client";

import { createNewPost } from "../action/createPostAction"; // Correct import
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { ImageIcon, XIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";

const PostForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, isLoaded } = useUser();

  const [postText, setPostText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("postText", postText);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      // Directly call the server action with the form data
      await createNewPost(formData);

      // Reset form on successful submission
      setPostText("");
      setImageFile(null);
      setImagePreview(null);
      formRef.current?.reset();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center p-4">
        <ClipLoader size={50} color={"#0B63C4"} />
      </div>
    );
  }

  // The rest of your return JSX remains the same...
  return (
    <div className="p-4 bg-white rounded-lg border">
      <form ref={formRef} onSubmit={handlePost} className="space-y-4">
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
            disabled={isSubmitting}
          />
        </div>

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
              disabled={isSubmitting}
            >
              <XIcon size={16} />
            </Button>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <Button type="button" variant="ghost" onClick={handleImageButtonClick} disabled={isSubmitting}>
            <ImageIcon className="mr-2" size={20} />
            Photo
          </Button>
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" hidden />
          <Button type="submit" disabled={(!postText.trim() && !imageFile) || isSubmitting}>
            {isSubmitting ? <ClipLoader size={20} color={"#ffffff"} /> : "Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;