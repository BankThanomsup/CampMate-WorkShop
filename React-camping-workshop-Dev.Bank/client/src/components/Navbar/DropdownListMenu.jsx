import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignLeft } from "lucide-react";
import Usericon from "./Usericon";
import { Button } from "../ui/button";
import { PublicLinks,PrivateLinks } from "@/utils/links";
import { Link } from "react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import SignOutLink from "./SignOutLink";

const DropdownListMenu = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <AlignLeft />
            <Usericon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {PublicLinks.map((item, index) => {
            //code body javascript
            //return 1 element
            return (
              <DropdownMenuItem key={index}>
                <Link to={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <SignedOut>
            <DropdownMenuItem>
              {/* {กรณียังไม่ได้ login} */}
              <SignInButton mode="modal">
                <button>Login</button>
              </SignInButton>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignUpButton mode="modal">
                <button>Register</button>
              </SignUpButton>
            </DropdownMenuItem>
          </SignedOut>
          
            {/* {กรณีที่ login แล้ว} */}
            <SignedIn>
            {/* Link Other */}
          {PrivateLinks.map((item, index) => {
            //code body javascript
            //return 1 element
            return (
              <DropdownMenuItem key={index}>
                <Link to={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
              {/* <UserButton /> */}
              {/* <SignOutButton /> */}
              <SignOutLink />
            </DropdownMenuItem>
            </SignedIn>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownListMenu;
