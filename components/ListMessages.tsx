"use client";
import { Message, useMessage } from "@/lib/store/messages";
import React, { useEffect, useRef, useState } from "react";
import MessageItem from "./Message";
import { DeleteAlert, EditAlert } from "./MessageActions";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { ArrowDown } from "lucide-react";
import LoadMoreMessages from "./LoadMoreMessages";
import { Skeleton } from "./ui/skeleton";

export default function ListMessages() {
 const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
 const [userScrolled, setUserScrolled] = useState(false);
 const [notification, setNotification] = useState(0);

 const {
  messages,
  optimisticIds,
  addMessage,
  optimisticDeleteMessage,
  optimisticUpdateMessage,
 } = useMessage((state) => state);
 const supabase = supabaseBrowser();

 useEffect(() => {
  const channel = supabase
   .channel("chat-room")
   .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "messages" },
    async (payload) => {
     if (!optimisticIds.includes(payload.new.id)) {
      const { error, data } = await supabase
       .from("users")
       .select("*")
       .eq("id", payload.new.send_by)
       .single();
      if (error) {
       toast.error(error.message);
      } else {
       const newMessage = {
        ...payload.new,
        users: data,
        };
        //@ts-ignore
       addMessage(newMessage as Message);
      }
     }
     const scrollContainer = scrollRef.current;
     if (
      scrollContainer.scrollTop <
      scrollContainer.scrollHeight - scrollContainer.clientHeight - 10
     ) {
      setNotification((current) => current + 1);
     }
    }
   )
   .on(
    "postgres_changes",
    { event: "DELETE", schema: "public", table: "messages" },
    (payload) => {
     optimisticDeleteMessage(payload.old.id);
    }
   )
   .on(
    "postgres_changes",
    { event: "UPDATE", schema: "public", table: "messages" },
    (payload) => {
     optimisticUpdateMessage(payload.new as Message);
    }
   )
   .subscribe();

  return () => {
   channel.unsubscribe();
  };
 }, [messages]);

 useEffect(() => {
  const scrollContainer = scrollRef.current;
  if (scrollContainer && !userScrolled) {
   scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }
 }, [messages]);

 const handleOnScroll = () => {
  const scrollContainer = scrollRef.current;
  if (scrollContainer) {
   const isScroll =
    scrollContainer.scrollTop <
    scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
   setUserScrolled(isScroll);
   if (
    scrollContainer.scrollTop ===
    scrollContainer.scrollHeight - scrollContainer.clientHeight
   ) {
    setNotification(0);
   }
  }
 };

 const scrollDown = () => {
  setNotification(0);
  const scrollElement = scrollRef.current;
  if (scrollElement) {
   scrollElement.scrollTo({
    top: scrollElement.scrollHeight,
    behavior: "smooth",
   });
  }
 };
 return (
  <>
   <div
    className="flex-1 flex flex-col p-5 h-full overflow-y-scroll cont"
    ref={scrollRef}
    onScroll={handleOnScroll}
   >
    <div className="flex-1 pb-5 ">
     <LoadMoreMessages />
    </div>
    <div className=" space-y-7">
     {messages.length > 0
      ? messages.map((value, index) => {
         return <MessageItem key={value.id} message={value} />;
        })
      : generateRandomTimes()}
    </div>

    <DeleteAlert />
    <EditAlert />
   </div>
   {userScrolled && (
    <div className="  w-full relative">
     {notification ? (
      <div
       className="absolute -bottom-4 right-[50%] translate-x-[50%]  w-36 mx-auto bg-indigo-500 p-1 rounded-md cursor-pointer text-center"
       onClick={scrollDown}
      >
       <h1>New {notification} messages</h1>
      </div>
     ) : (
      <div
       className="absolute bottom-8 right-8  w-12 h-12 bg-blue-500 rounded-md justify-center items-center flex mx-auto border cursor-pointer hover:scale-110 transition-all "
       onClick={scrollDown}
      >
       <ArrowDown />
      </div>
     )}
    </div>
   )}
  </>
 );
}

const generateRandomTimes = () => {
 const randomTimes = [];
 for (let i = 0; i < 4 + Math.random() * 6; i++) {
  randomTimes.push(i);
 }
 return randomTimes.map((index) => (
  <div key={index} className="flex items-center space-x-4">
   <Skeleton className="h-12 w-12 rounded-full" />
   <div className="space-y-2">
    <Skeleton
     style={{ width: `${200 + Math.random() * 300}px` }}
     className="h-4"
    />
    <Skeleton
     style={{ width: `${150 + Math.random() * 250}px` }}
     className="h-4"
    />
   </div>
  </div>
 ));
};
