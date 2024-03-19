"use client";
import React from "react";
import { Input } from "./ui/input";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/lib/store/user";
import { Message, useMessage } from "@/lib/store/messages";
import { Chat, useChat } from "@/lib/store/chats";

export default function ChatInput({ start }: { start: Chat }) {
 const user = useUser((state) => state.user);
 const addMessage = useMessage((state) => state.addMessage);
 const setLastMessage = useMessage((state) => state.setLastMessage);
 const setOptimisticIds = useMessage((state) => state.setOptimisticIds);
 const actionChat = useChat((state) => state.actionChat);
 const setActionChat = useChat((state) => state.setActionChat);

  const supabase = supabaseBrowser();
  if (!actionChat) {
    setActionChat(start)
  }
 const handleSendMessage = async (text: string) => {
  if (text.trim()) {
   const id = uuidv4();
   const newMessage = {
    id,
    text,
    send_by: user?.id,
    is_edit: false,
    chat_id: actionChat?.chat_id ,
    created_at: new Date().toISOString(),
    users: {
     id: user?.id,
     avatar_url: user?.user_metadata.avatar_url,
     created_at: new Date().toISOString(),
     display_name: user?.user_metadata.user_name,
    },
   };
   addMessage(newMessage as Message);
   setOptimisticIds(newMessage.id);
   const {  error } = await supabase
    .from("messages")
    .insert({ text, id, chat_id: actionChat?.chat_id })
   if (error) {
    toast.error(error.message);
   }
   //@ts-ignore
   setLastMessage(newMessage);
   //  console.log(newMessage);
  } else {
   toast.error("Message can not be empty!!");
  }
  //  @ts-ignore
  await supabase
   .from("chat")
   .update({ lastMessage: text })
   .eq("id", actionChat?.chat_id!);
 };
 return (
  <div className="p-5">
   <Input
    placeholder="send message"
    onKeyDown={(e) => {
     if (e.key === "Enter") {
      handleSendMessage(e.currentTarget.value);
      e.currentTarget.value = "";
     }
    }}
   />
  </div>
 );
}
