import { create } from "zustand";
import { LIMIT_MESSAGE } from "../constant";

export type Message = {
 created_at: string;
 id: string;
 is_edit: boolean;
 send_by: string;
 text: string;
 users: {
  avatar_url: string;
  created_at: string;
  display_name: string;
  id: string;
 } | null;
};

interface MessageState {
 hasMore: boolean;
 page: number;
 lastMessage: Message | undefined;
 messages: Message[];
 actionMessage: Message | undefined;
 optimisticIds: string[];
 addMessage: (message: Message) => void;
 setActionMessage: (message: Message | undefined) => void;
 optimisticDeleteMessage: (messageId: string) => void;
 optimisticUpdateMessage: (message: Message) => void;
 setOptimisticIds: (id: string) => void;
 setMesssages: (messages: Message[]) => void;
 setChatMessages: (messages: Message[]) => void;
 setLastMessage: (message: Message) => void;
}

// export const useMessage = create<MessageState>()((set) => ({
//  messages: [],
//  actionMessage: undefined,
//  optimisticIds: [],
//  addMessage: (newMessages) =>
//   set((state) => ({
//    messages: [...state.messages, newMessages],
//    optimisticIds: [...state.optimisticIds, newMessages.id],
//   })),
//  setActionMessage: (message) => set((state) => ({ actionMessage: message })),
//  optimisticDeleteMessage: (messageId) =>
//   set((state) => {
//    return { messages: state.messages.filter((msg) => msg.id !== messageId) };
//   }),
//  optimisticUpdateMessage: (updatedMessage) =>
//   set((state) => {
//    return {
//     messages: state.messages.filter((msg) => {
//      if (msg.id === updatedMessage.id) {
//       msg.text = updatedMessage.text;
//       msg.is_edit = updatedMessage.is_edit;
//      }
//      return msg;
//     }),
//    };
//   }),
// }));

export const useMessage = create<MessageState>()((set) => ({
 hasMore: true,
 page: 1,
 messages: [],
 optimisticIds: [],
 actionMessage: undefined,
 lastMessage: undefined,
 setMesssages: (messages) =>
  set((state) => ({
   messages: [...messages, ...state.messages],
   page: state.page + 1,
   hasMore: messages.length >= LIMIT_MESSAGE,
  })),
 setChatMessages: (messages) =>
  set((state) => ({
   messages: [...messages],
  })),
 setOptimisticIds: (id: string) =>
  set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
 addMessage: (newMessages) =>
  set((state) => ({
   messages: [...state.messages, newMessages],
  })),
 setActionMessage: (message) => set(() => ({ actionMessage: message })),
 optimisticDeleteMessage: (messageId) =>
  set((state) => {
   return {
    messages: state.messages.filter((message) => message.id !== messageId),
   };
  }),
 optimisticUpdateMessage: (updateMessage) =>
  set((state) => {
   return {
    messages: state.messages.filter((message) => {
     if (message.id === updateMessage.id) {
      message.text = updateMessage.text;
      message.is_edit = updateMessage.is_edit;
     }
     return message;
    }),
   };
  }),
 setLastMessage: (ls) =>
  set((state) => ({
   lastMessage: ls,
  })),
}));
