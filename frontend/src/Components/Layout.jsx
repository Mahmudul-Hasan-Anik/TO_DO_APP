import React, { useEffect } from "react";
import MenuBar from "./MenuBar";

const Layout = ({ title = "title", className, children }) => {
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <>
      <MenuBar/>
      <div className={className}>{children}</div>
    </>
  );
};

export default Layout;