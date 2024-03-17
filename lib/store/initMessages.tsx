"use client";


import React, { useEffect, useRef } from "react";
import { useMessage } from "./messages";
import { Message } from "./messages";

export default function InitMessages({ messages }: { messages: Message[] }) {
 const initState = useRef(false);
 useEffect(() => {
  if (initState.current) {
   useMessage.setState({ messages });
  }
  initState.current = true;
 }, []);

 return <></>;
}
