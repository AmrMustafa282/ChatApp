"use client";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useRef } from "react";

import { Message, useMessage } from "./messages";
import { LIMIT_MESSAGE } from "../constant";

export default function InitMessages({ messages }: { messages: Message[] }) {
 const initState = useRef(false);
 const hasMore = messages.length >= LIMIT_MESSAGE;

 useEffect(() => {
  if (!initState.current) {
   useMessage.setState({ messages, hasMore });
  }
  initState.current = true;
  // eslint-disable-next-line
 }, []);

 return <></>;
}
