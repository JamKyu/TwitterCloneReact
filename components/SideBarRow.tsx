import React, { SVGProps } from "react";

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
}

function SideBarRow({ Icon, title }: Props) {
  return (
    <div className="flex max-w-fit items-center space-x-2 p-3 rounded-full hover:bg-zinc-800 transition-all duration-200 group cursor-pointer lg:pr-6">
      <Icon className="h-6 w-6" />
      <p className="group-hover:text-twitter hidden lg:inline-flex text-base font-light lg:text-xl">
        {title}
      </p>
    </div>
  );
}

export default SideBarRow;
