export type Json =
 | string
 | number
 | boolean
 | null
 | { [key: string]: Json | undefined }
 | Json[];

export type Database = {
 public: {
  Tables: {
   chat: {
    Row: {
     chat_name: string | null;
     created_at: string;
     id: number;
     lastMessage: string | null;
    };
    Insert: {
     chat_name?: string | null;
     created_at?: string;
     id?: number;
     lastMessage?: string | null;
    };
    Update: {
     chat_name?: string | null;
     created_at?: string;
     id?: number;
     lastMessage?: string | null;
    };
    Relationships: [];
   };
   messages: {
    Row: {
     chat_id: number | null;
     created_at: string;
     id: string;
     is_edit: boolean;
     send_by: string;
     text: string;
    };
    Insert: {
     chat_id?: number | null;
     created_at?: string;
     id?: string;
     is_edit?: boolean;
     send_by?: string;
     text: string;
    };
    Update: {
     chat_id?: number | null;
     created_at?: string;
     id?: string;
     is_edit?: boolean;
     send_by?: string;
     text?: string;
    };
    Relationships: [
     {
      foreignKeyName: "public_messages_chat_id_fkey";
      columns: ["chat_id"];
      isOneToOne: false;
      referencedRelation: "chat";
      referencedColumns: ["id"];
     },
     {
      foreignKeyName: "public_messages_send_by_fkey";
      columns: ["send_by"];
      isOneToOne: false;
      referencedRelation: "users";
      referencedColumns: ["id"];
     }
    ];
   };
   user_chat: {
    Row: {
     chat_id: number;
     created_at: string;
     id: number;
     other_id: string | null;
     user_id: string;
    };
    Insert: {
     chat_id: number;
     created_at?: string;
     id?: number;
     other_id?: string | null;
     user_id?: string;
    };
    Update: {
     chat_id?: number;
     created_at?: string;
     id?: number;
     other_id?: string | null;
     user_id?: string;
    };
    Relationships: [
     {
      foreignKeyName: "public_user_chat_chat_id_fkey";
      columns: ["chat_id"];
      isOneToOne: false;
      referencedRelation: "chat";
      referencedColumns: ["id"];
     },
     {
      foreignKeyName: "public_user_chat_user_id_fkey";
      columns: ["user_id"];
      isOneToOne: false;
      referencedRelation: "users";
      referencedColumns: ["id"];
     }
    ];
   };
   users: {
    Row: {
     avatar_url: string;
     created_at: string;
     display_name: string;
     friends: string | null;
     id: string;
    };
    Insert: {
     avatar_url: string;
     created_at?: string;
     display_name: string;
     friends?: string | null;
     id?: string;
    };
    Update: {
     avatar_url?: string;
     created_at?: string;
     display_name?: string;
     friends?: string | null;
     id?: string;
    };
    Relationships: [
     {
      foreignKeyName: "public_users_id_fkey";
      columns: ["id"];
      isOneToOne: true;
      referencedRelation: "users";
      referencedColumns: ["id"];
     }
    ];
   };
  };
  Views: {
   [_ in never]: never;
  };
  Functions: {
   [_ in never]: never;
  };
  Enums: {
   [_ in never]: never;
  };
  CompositeTypes: {
   [_ in never]: never;
  };
 };
};

export type Tables<
 PublicTableNameOrOptions extends
  | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
  | { schema: keyof Database },
 TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
     Database[PublicTableNameOrOptions["schema"]]["Views"])
  : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
 ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
    Row: infer R;
   }
   ? R
   : never
 : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
    Database["public"]["Views"])
 ? (Database["public"]["Tables"] &
    Database["public"]["Views"])[PublicTableNameOrOptions] extends {
    Row: infer R;
   }
   ? R
   : never
 : never;

export type TablesInsert<
 PublicTableNameOrOptions extends
  | keyof Database["public"]["Tables"]
  | { schema: keyof Database },
 TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
 ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
   }
   ? I
   : never
 : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
 ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
    Insert: infer I;
   }
   ? I
   : never
 : never;

export type TablesUpdate<
 PublicTableNameOrOptions extends
  | keyof Database["public"]["Tables"]
  | { schema: keyof Database },
 TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
 ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
   }
   ? U
   : never
 : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
 ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
    Update: infer U;
   }
   ? U
   : never
 : never;

export type Enums<
 PublicEnumNameOrOptions extends
  | keyof Database["public"]["Enums"]
  | { schema: keyof Database },
 EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
  : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
 ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
 : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
 ? Database["public"]["Enums"][PublicEnumNameOrOptions]
 : never;
