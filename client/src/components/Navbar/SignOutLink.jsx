import React from "react";
import { SignOutButton } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";
const SignOutLink = () => {
  const { toast } = useToast();
  const handleLogout = () => {
    //code body
    toast({ description: "Logout Suscessfully" });
  };
  return (
    <SignOutButton redirectUrl="/">
      <button onClick={handleLogout}>Logout</button>
    </SignOutButton>
  );
};

export default SignOutLink;
