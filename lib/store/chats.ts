import { create } from "zustand";

export type Chat = {
 chat_id: number;
 created_at: string;
 id: number;
 user_id: string;
 users: {
  avatar_url: string;
  created_at: string;
  display_name: string;
  id: string;
 };
 chat: {
  chat_name: string | null;
  created_at: string;
  id: number;
 };
};

interface ChatState {
 chats: Chat[];
 actionChat: Chat | undefined;
 optimisticIds: string[];
 setActionChat: (chat: Chat | undefined) => void;
 addChat: (chat: Chat) => void;
 optimisticDeleteChat: (chatId: number) => void;
 setOptimisticIds: (id: string) => void;
}

export const useChat = create<ChatState>()((set) => ({
 chats: [],
 actionChat: undefined,
 optimisticIds: [],
 setActionChat: (chat) => set(() => ({ actionChat: chat })),
 addChat: (newChats) =>
  set((state) => ({
   chats: [...state.chats, newChats],
  })),
 optimisticDeleteChat: (chatId) =>
  set((state) => {
   return {
    chats: state.chats.filter((chat) => chat.id !== chatId),
   };
  }),
 setOptimisticIds: (id: string) =>
  set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
}));
