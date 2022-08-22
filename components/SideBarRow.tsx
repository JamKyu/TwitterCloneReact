import React, { SVGProps } from "react";

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => {};
}

function SideBarRow({ Icon, title, onClick }: Props) {
  return (
    <div
      onClick={() => onClick?.()}
      className={`flex max-w-fit items-center space-x-2 p-3 rounded-full hover:bg-zinc-800 transition-all duration-200 group ${
        onClick ? "cursor-pointer bg-twitter bg-opacity-90" : "cursor-not-allowed"
      } lg:pr-6`}
    >
      <Icon className="h-6 w-6" />
      <p className="group-hover:text-twitter hidden lg:inline-flex text-base font-light lg:text-xl">
        {title}
      </p>
    </div>
  );
}

export default SideBarRow;
