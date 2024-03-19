"use client";
import React, { useEffect } from "react";
import UserChatItem from "./UserChat";
import { Chat, useChat } from "@/lib/store/chats";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { User } from "@supabase/supabase-js";
import UserFindItem from "./UserFindItem";
import { DeleteAlert } from "./ChatActions";
import { IUser } from "@/lib/store/user";

export default function ListChats({
 user_chats,
 users,
 mainUser,
 filteredUsers,
 findUsers,
}: {
 user_chats: Chat[];
 users: User[];
 filteredUsers: IUser[];
 mainUser: User;
 findUsers: IUser[];
}) {
 return (
  <div className="dark:bg-[#18181B] border-r shadow-sm rounded-md  col-span-1 w-full flex flex-col gap-4 py-5 px-4 h-full overflow-y-scroll ">
   <Tabs defaultValue="chats" className="w-full">
    <TabsList>
     <TabsTrigger value="chats">Chats</TabsTrigger>
     <TabsTrigger value="find">Find</TabsTrigger>
    </TabsList>
    <TabsContent value="chats">
     {user_chats.map((user_chat, index) => (
      //@ts-ignore
      <UserChatItem
       key={user_chat.chat_id}
       user_chat={user_chat}
       filteredUser={filteredUsers[index]}
      />
     ))}
    </TabsContent>
    <TabsContent value="find">
     {findUsers
      .filter((e) => e.id !== mainUser.id)
      .map((user, index) => (
       //@ts-ignore
       <UserFindItem key={user.id} user={user} mainUser={mainUser} />
      ))}
    </TabsContent>
   </Tabs>
   <DeleteAlert />
  </div>
 );
}
