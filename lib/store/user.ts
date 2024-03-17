import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface UserStata {
 user: User | undefined;
}

export const useUser = create<UserStata>()((set) => ({
 user: undefined,
}));
