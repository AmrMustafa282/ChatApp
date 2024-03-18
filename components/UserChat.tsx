"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import moment from "moment";

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import { Chat, useChat } from "@/lib/store/chats";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { LIMIT_MESSAGE } from "@/lib/constant";
import { useMessage } from "@/lib/store/messages";
import { User } from "@supabase/supabase-js";
import { IUser } from "@/lib/store/user";

export default function UserChatItem({
 user_chat,
 filteredUser,
}: {
 user_chat: Chat;
 filteredUser: IUser;
}) {
 const setChatMessages = useMessage((state) => state.setChatMessages);
 const lastMessage = useMessage((state) => state.lastMessage);

 const setActionChat = useChat((state) => state.setActionChat);
 const [change, setChange] = useState<any>(false);
 // @ts-ignore
 const [ls, setLs] = useState<any>(user_chat.chat.lastMessage);

 const handelData = async () => {
  setActionChat(user_chat);
  setChatMessages([]);
  const supabase = supabaseBrowser();
  const { data } = await supabase
   .from("messages")
   .select("*,users(*),chat(*)")
   .eq("chat_id", user_chat?.chat_id)
   .range(0, LIMIT_MESSAGE)
   .order("created_at", { ascending: false });
  setChatMessages(data?.reverse()!);
 };

     useEffect(() => {
          if (lastMessage) setLs(lastMessage);
     },[lastMessage])
     
 return (
  <div
   className="flex gap-2 my-3 border shadow-sm  rounded-md p-3 cursor-pointer hover:scale-[1.01] duration-300 transition-all"
   onClick={handelData}
  >
   <div>
    <Image
     src={filteredUser.avatar_url!}
     alt={filteredUser.display_name!}
     width={40}
     height={40}
     className="rounded-full ring-2"
    ></Image>
   </div>
   <div className="flex-1">
    <div className="flex  items-center  justify-between">
     <div className="flex items-center gap-1">
      <h1 className="font-bold">
       {
        //@ts-ignore
        filteredUser?.display_name
       }
      </h1>
      <h1 className="text-sm text-gray-400">
       {/* {new Date(message.created_at).toDateString()} */}
       {/* {moment(message.created_at).fromNow()} */}3 hours ago
      </h1>
      {/* {message.is_edit && (
       <h1 className="text-sm text-gray-400 underline">edited</h1>
      )} */}
     </div>
     <MessageMenu user_chat={user_chat} />
    </div>
    <p className="text-gray-300">
     {/* @ts-ignore */}
     {ls}
    </p>
   </div>
  </div>
 );
}

const MessageMenu = ({ user_chat }: { user_chat: Chat }) => {
 const setActionChat = useChat((state) => state.setActionChat);
 return (
  <DropdownMenu>
   <DropdownMenuTrigger>
    <MoreHorizontal />
   </DropdownMenuTrigger>
   <DropdownMenuContent>
    <DropdownMenuLabel>Action</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem
     onClick={() => {
      document.getElementById("trigger-delete-chat")?.click();
      setActionChat(user_chat);
     }}
    >
     Delete
    </DropdownMenuItem>
   </DropdownMenuContent>
  </DropdownMenu>
 );
};
