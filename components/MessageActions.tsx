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
 DialogDescription,
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

export function DeleteAlert() {
 const actionMessage = useMessage((state) => state.actionMessage);
 const optimisticDeleteMessage = useMessage(
  (state) => state.optimisticDeleteMessage
 );

 const handelDeleteMessage = async () => {
  const supabase = supabaseBrowser();
  optimisticDeleteMessage(actionMessage?.id!);
  const { data, error } = await supabase
   .from("messages")
   .delete()
   .eq("id", actionMessage?.id!);
  if (error) toast.error(error.message);
  else toast.success("massage deleted successfully");
 };

 return (
  <AlertDialog>
   <AlertDialogTrigger asChild>
    <button id="trigger-delete"></button>
   </AlertDialogTrigger>
   <AlertDialogContent>
    <AlertDialogHeader>
     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
     <AlertDialogDescription>
      This action cannot be undone. This will permanently delete your account
      and remove your data from our servers.
     </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
     <AlertDialogCancel>Cancel</AlertDialogCancel>
     <AlertDialogAction onClick={handelDeleteMessage}>
      Continue
     </AlertDialogAction>
    </AlertDialogFooter>
   </AlertDialogContent>
  </AlertDialog>
 );
}

export function EditAlert() {
 const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
 const actionMessage = useMessage((state) => state.actionMessage);
 const optimisticUpdateMessage = useMessage(
  (state) => state.optimisticUpdateMessage
 );

 const handelMessageEdit = async () => {
  const text = inputRef.current.value.trim();
  if (text === actionMessage?.text) {
   return document.getElementById("trigger-edit")?.click();
  }
  if (text) {
   const supabase = supabaseBrowser();
   optimisticUpdateMessage({
    ...actionMessage,
    text,
    is_edit: true,
   } as Message);
   const { error } = await supabase
    .from("messages")
    .update({ text, is_edit: true })
    .eq("id", actionMessage?.id!);
   if (error) toast.error(error.message);
   else toast.success("Massage updated successfully");
   document.getElementById("trigger-edit")?.click();
  } else {
   document.getElementById("trigger-edit")?.click();
   document.getElementById("trigger-delete")?.click();
  }
 };

 return (
  <Dialog>
   <DialogTrigger asChild>
    <button id="trigger-edit"></button>
   </DialogTrigger>
   <DialogContent className="w-full">
    <DialogHeader>
     <DialogTitle>Edit message</DialogTitle>
    </DialogHeader>
    <Input ref={inputRef} id="name" defaultValue={actionMessage?.text} />
    <DialogFooter>
     <Button onClick={handelMessageEdit}>Save</Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}
