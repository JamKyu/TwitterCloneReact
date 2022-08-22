import React from "react";
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  MailIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  UserIcon,
} from "@heroicons/react/outline";
import SideBarRow from "./SideBarRow";
import { signIn, signOut, useSession } from "next-auth/react";

function SideBar() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col col-span-2 items-center px-4 lg:items-start">
      <img
        className="h-6 w-6 m-3 lg:h-10 lg:w-10"
        src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg"
        alt=""
      />
      <SideBarRow Icon={HomeIcon} title="Home" />
      <SideBarRow Icon={HashtagIcon} title="Explore" />
      <SideBarRow Icon={BellIcon} title="Notifications" />
      <SideBarRow Icon={MailIcon} title="Messages" />
      <SideBarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SideBarRow Icon={CollectionIcon} title="Lists" />
      <SideBarRow
        onClick={session ? signOut : signIn}
        Icon={UserIcon}
        title={session ? "Sign Out" : "Sign In"}
      />
      <SideBarRow Icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  );
}

export default SideBar;
