import ChatAbout from "@/components/ChatAbout";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import ListChats from "@/components/ListChats";
import InitUser from "@/lib/store/InitUser";
import { supabaseServer } from "@/lib/supabase/server";
import React from "react";
import landing from "./assets/landing2.png";
import Image from "next/image";
import UserChatItem from "@/components/UserChat";

export default async function Page() {
 const supabase = supabaseServer();
 const { data } = await supabase.auth.getSession();
 const { data: user_chats, error } = await supabase
  .from("user_chat")
  .select("*,users(*),chat(*)")
  .eq("user_id", data.session?.user.id!);
 //  console.log(user_chats);
 const { data: users } = await supabase.from("users").select("*");

 //@ts-ignore
 const filteredUsers = [];
 users?.forEach((user) => {
  const f_user = user_chats?.find(
   (user_chat) =>
    user.id === user_chat.other_id && user.id !== data.session?.user.id
  );
  if (f_user) {
   filteredUsers.push(user);
   //@ts-ignore
   //  filteredUsers.reverse();
  }
 });
 //@ts-ignore
 // const findUsers = [];
 // if (user_chats) {
 //   user_chats?.forEach((user_chat) => {
 //   const f_user = user_chats?.find(
 //    (user_chat) =>
 //     user.id === user_chat.other_id && user.id !== data.session?.user.id
 //   );
 //   if (f_user) {
 //    filteredUsers.push(user);
 //   }
 //  });
 const findUsers = getUniqueElements(users, filteredUsers);
 function getUniqueElements(array1: any, array2: any) {
  let combinedArray = array1.concat(array2);
  let uniqueElements = combinedArray.filter((element: any, index: any) => {
   return array1.indexOf(element) === index && array2.indexOf(element) === -1;
  });

  return uniqueElements;
 }
 // console.log(findUsers)

 //  console.log('user_chats',user_chats)
 //  console.log('users', users)
 //  console.log('filterd', filteredUsers)
 //  console.log('findUsers',findUsers)

 return (
  <>
   <div className="max-w-7xl mx-auto md:py-10 h-screen relative w-full ">
    <div className="">
     <ChatHeader user={data.session?.user} />
    </div>
    <div className="h-[90%] border rounded-md  grid grid-cols-3 ">
     {data.session?.user ? (
      <>
       <ListChats
        // @ts-ignore
        user_chats={user_chats}users={users}filteredUsers={filteredUsers}
        mainUser={data.session.user}
        findUsers={findUsers}
       />
       {user_chats?.length! > 0 && (
        <div className="col-span-2 flex flex-col overflow-y-auto">
         <ChatMessages
          //@ts-ignore
          start={user_chats[0].chat_id}
         />
         <ChatInput
          //@ts-ignore
          start={user_chats[0]}
         />
        </div>
       )}
      </>
     ) : (
      <>
       <ChatAbout />
       <Image
        src={landing}
        alt=""
        className="w-full h-full col-span-2 object-cover "
        // width={500}
        // height={300}
       />
      </>
     )}
    </div>
   </div>
   <InitUser user={data.session?.user} />
  </>
 );
}
