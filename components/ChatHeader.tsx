"use client";
import React from "react";
import { Button } from "./ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import ChatPresence from "./ChatPresence";

const ChatHeader = ({ user }: { user: User | undefined }) => {
  const router = useRouter();
 const handelLoginWithGithub = () => {
  const supabase = supabaseBrowser();
  supabase.auth.signInWithOAuth({
   provider: "github",
   options: {
    redirectTo: location.origin + "/auth/callback",
   },
  });
 };
  const handleLogout = async() => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.refresh();
 };

 return (
  <div className="h-20">
   <div className="p-5  flex items-center justify-between  backdrop-blur-sm  ">
    <div>
         <h1 className="text-xl font-bold">Daily Chat</h1>
         <ChatPresence />
    </div>
    {user ? (
     <Button onClick={handleLogout}>Logout</Button>
    ) : (
     <Button onClick={handelLoginWithGithub}>Login</Button>
    )}
   </div>
  </div>
 );
};

export default ChatHeader;
