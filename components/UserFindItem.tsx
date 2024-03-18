"use client";
import Image from "next/image";
import React from "react";
import { Plus } from "lucide-react";
import { useMessage } from "@/lib/store/messages";
import { IUser } from "@/lib/store/user";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UserChatItem({
 user,
 mainUser,
}: {
 user: IUser;
 mainUser: User;
}) {
 const router = useRouter();
 const setChatMessages = useMessage((state) => state.setChatMessages);

 const supabase = supabaseBrowser();
 const handelAddUser = async () => {
  setChatMessages([]);
  toast.promise(
   async () => {
    const { data: chat } = await supabase
     .from("chat")
     .insert({ chat_name: `chat${Date.now()}` })
     .select()
     .single();

    const { data: user_chat, error } = await supabase
     .from("user_chat")

     .insert([
      { user_id: mainUser.id, chat_id: chat?.id!, other_id: user.id },
      { user_id: user.id, chat_id: chat?.id!, other_id: mainUser.id },
     ])
     .select();
    return user_chat;
   },
   {
    loading: "Creating chat...",
    success: "Chat created successfully",
    error: "Failed to create chat",
   }
  );
  router.refresh();
 };

 return (
  <div className="flex  gap-2 my-3 border shadow-sm  rounded-md p-3 cursor-pointer hover:scale-[1.01] duration-300 transition-all">
   {user && (
    <>
     <div>
      <Image
       src={user.avatar_url!}
       alt={user.display_name!}
       width={40}
       height={40}
       className="rounded-full ring-2"
      ></Image>
     </div>
     <div className="flex-1">
      <div className="flex items-center  justify-between ">
       <div className="flex items-center gap-1">
        <h1 className="font-bold">{user.display_name}</h1>
       </div>
      </div>
      <p className="dark:text-gray-400 text-gray-800 ">I took a bill</p>
     </div>
     <Plus className="my-auto" onClick={handelAddUser} />
    </>
   )}
  </div>
 );
}
