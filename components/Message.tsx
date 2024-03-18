import { Message, useMessage } from "@/lib/store/messages";
import Image from "next/image";
import React from "react";
import moment from 'moment'

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useUser } from "@/lib/store/user";

export default function MessageItem({ message }: { message: Message }) {
 const user = useUser((state) => state.user);
 return (
  <div className="flex gap-2 ">
   <div>
    <Image
     src={message.users?.avatar_url!}
     alt={message.users?.display_name!}
     width={40}
     height={40}
     className="rounded-full ring-2"
    ></Image>
   </div>
   <div className="flex-1">
    <div className="flex items-center  justify-between">
     <div className="flex items-center gap-1">
      <h1 className="font-bold">{message.users?.display_name}</h1>
      <h1 className="text-sm dark:text-gray-400 text-gray-800">
       {/* {new Date(message.created_at).toDateString()} */}
       {moment(message.created_at).fromNow()}
           </h1>
           {message.is_edit && 
           <h1 className="text-sm dark:text-gray-400 text-gray-800 underline">edited</h1>
           }
     </div>
     {user?.id === message.send_by && <MessageMenu message={message} />}
    </div>
    <p className="dark:text-gray-300 text-gray-800">{message.text}</p>
   </div>
  </div>
 );
}

const MessageMenu = ({ message }: { message: Message }) => {
 const setActionMessage = useMessage((state) => state.setActionMessage);
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
      document.getElementById("trigger-edit")?.click();
      setActionMessage(message);
     }}
    >
     Edit
    </DropdownMenuItem>
    <DropdownMenuItem
     onClick={() => {
      document.getElementById("trigger-delete")?.click();
      setActionMessage(message);
     }}
    >
     Delete
    </DropdownMenuItem>
   </DropdownMenuContent>
  </DropdownMenu>
 );
};
