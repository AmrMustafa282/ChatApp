import { create } from "zustand";

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
 messages: Message[];
 actionMessage: Message | undefined;
 addMessage: (message: Message) => void;
 setActionMessage: (message: Message | undefined) => void;
 optimisticDeleteMessage: (messageId: string) => void;
 optimisticUpdateMessage: (updatedMessage: Message) => void;
}

export const useMessage = create<MessageState>()((set) => ({
 messages: [],
 actionMessage: undefined,
 addMessage: (message) =>
  set((state) => ({ messages: [...state.messages, message] })),
 setActionMessage: (message) => set((state) => ({ actionMessage: message })),
 optimisticDeleteMessage: (messageId) =>
  set((state) => {
   return { messages: state.messages.filter((msg) => msg.id !== messageId) };
  }),
 optimisticUpdateMessage: (updatedMessage) =>
  set((state) => {
   return {
    messages: state.messages.filter((msg) => {
     if (msg.id === updatedMessage.id) {
      msg.text = updatedMessage.text;
      msg.is_edit = updatedMessage.is_edit;
     }
     return msg;
    }),
   };
  }),
}));
