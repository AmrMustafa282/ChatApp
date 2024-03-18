import { User } from "@supabase/supabase-js";
import { create } from "zustand";

export type IUser = {
 avatar_url: string;
 created_at: string;
 display_name: string;
 id: string;
};

interface UserStata {
 user: User | undefined;
}

export const useUser = create<UserStata>()((set) => ({
 user: undefined,
}));
