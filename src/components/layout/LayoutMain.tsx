import React from "react";

interface ILayoutMainProps {
  children: React.ReactNode;
}
const LayoutMain = ({ children }: ILayoutMainProps) => {
  return (
    <>
      {/* <Topbar></Topbar> */}
      <div className="grid grid-cols-[250px_minmax(0,1fr)] min-h-screen">
        {/* <Sidebar></Sidebar> */}
        <div className="px-6 py-7">{children}</div>
      </div>
    </>
  );
};

export default LayoutMain;
