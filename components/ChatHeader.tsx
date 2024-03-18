"use client";
import {
 NavigationMenu,
 NavigationMenuContent,
 NavigationMenuIndicator,
 NavigationMenuItem,
 NavigationMenuLink,
 NavigationMenuList,
 NavigationMenuTrigger,
 NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import React from "react";
import { Button } from "./ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import ChatPresence from "./ChatPresence";

const ChatHeader = ({ user }: { user: User | undefined }) => {
 const router = useRouter();
 const handelLoginWithGithub = () => {
  const supabase = supabaseBrowser();
  supabase.auth.signInWithOAuth({
   provider: "github",
   options: {
    redirectTo: location.origin + "/auth/callback",
   },
  });
 };
 const handleLogout = async () => {
  const supabase = supabaseBrowser();
  await supabase.auth.signOut();
  router.refresh();
 };

 return (
  <div className="h-20 w-full flex items-center justify-between">
   <NavigationMenu>
    <NavigationMenuList>
     <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
       <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
     </NavigationMenuItem>
     <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
       <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
     </NavigationMenuItem>
     <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
       <NavigationMenuLink>Link </NavigationMenuLink>
      </NavigationMenuContent>
     </NavigationMenuItem>
     <NavigationMenuItem></NavigationMenuItem>
    </NavigationMenuList>
   </NavigationMenu>
   <div className="flex gap-8 w-full justify-end">
    <div className="flex gap-4 items-center ">
     <img
      src={user?.user_metadata.avatar_url}
      alt=""
      className="w-10 h-10 rounded-full"
     />
     <div>
      <h1>{user?.user_metadata?.email}</h1>
      <p className="text-sm text-gray-400">@{user?.user_metadata?.user_name}</p>
     </div>
    </div>

    {user ? (
     <Button onClick={handleLogout} className="">
      Logout
     </Button>
    ) : (
     <Button onClick={handelLoginWithGithub} className="">
      Login
     </Button>
    )}
   </div>
   {/* <div className="p-5  flex items-center justify-between   ">
    <div>
    <h1 className="text-xl font-bold">Daily Chat</h1>
    </div>
    
  </div>
*/}
  </div>
 );
};

export default ChatHeader;
