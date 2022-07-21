import { SearchIcon } from "@heroicons/react/outline";
import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

function Widget() {
  return (
    <div className="pl-4 mt-2 col-span-2 hidden lg:inline">
      <div className="flex items-center space-x-2 bg-zinc-800 p-3 rounded-full my-2">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="flex-1 bg-transparent outline-none"
        />
      </div>

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="TrashTastePod"
        options={{ height: 1000 }}
        theme="dark"
      />
    </div>
  );
}

export default Widget;
