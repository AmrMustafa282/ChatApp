"use client";

import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
 AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
 Dialog,
 DialogContent,
 DialogFooter,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message, useMessage } from "@/lib/store/messages";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { useRef } from "react";
import { useChat } from "@/lib/store/chats";
import { useRouter } from "next/navigation";

export function DeleteAlert() {
 const actionChat = useChat((state) => state.actionChat);
 const optimisticDeleteChat = useChat(
  (state) => state.optimisticDeleteChat
 );
const router = useRouter()
 const handelDeleteChat = async () => {
  const supabase = supabaseBrowser();
  optimisticDeleteChat(actionChat?.chat_id!);
  const { data, error } = await supabase
   .from("chat")
   .delete()
   .eq("id", actionChat?.chat_id!);
  if (error) toast.error(error.message);
   else toast.success("Chat deleted successfully");
   router.refresh();
 };

 return (
  <AlertDialog>
   <AlertDialogTrigger asChild>
    <button id="trigger-delete-chat"></button>
   </AlertDialogTrigger>
   <AlertDialogContent>
    <AlertDialogHeader>
     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
    </AlertDialogHeader>
    <AlertDialogFooter>
     <AlertDialogCancel>Cancel</AlertDialogCancel>
     <AlertDialogAction onClick={handelDeleteChat}>
      Continue
     </AlertDialogAction>
    </AlertDialogFooter>
   </AlertDialogContent>
  </AlertDialog>
 );
}

