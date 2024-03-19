
import React, { Suspense } from "react";
import ListMessages from "./ListMessages";

import InitMessages from "@/lib/store/initMessages";
import { LIMIT_MESSAGE } from "@/lib/constant";

import { supabaseServer } from "@/lib/supabase/server";
import { Chat } from "@/lib/store/chats";



export default async function ChatMessages({ start }: { start :number}) {
 const supabase = supabaseServer();

 const { data } = await supabase
  .from("messages")
  .select("*,users(*)")
  .eq("chat_id", start)
  .range(0, LIMIT_MESSAGE)
  .order("created_at", { ascending: false });

 return (
  <Suspense fallback="loading...">
   <ListMessages />
   <InitMessages messages={data?.reverse() || []} />
  </Suspense>
 );
}
