
import React, { Suspense } from "react";
import ListMessages from "./ListMessages";

import InitMessages from "@/lib/store/initMessages";
import { LIMIT_MESSAGE } from "@/lib/constant";

import { supabaseServer } from "@/lib/supabase/server";
// import { supabaseBrowser } from "@/lib/supabase/browser";


export default async function ChatMessages() {
 
 const supabase = supabaseServer();

 
 const { data } = await supabase
  .from("messages")
  .select("*,users(*)")
  .eq("chat_id", '1')
  .range(0, LIMIT_MESSAGE)
  .order("created_at", { ascending: false });

 return (
   <Suspense fallback="loading...">
     <ListMessages />
   <InitMessages messages={data?.reverse() || []} />
  </Suspense>
 );
}
