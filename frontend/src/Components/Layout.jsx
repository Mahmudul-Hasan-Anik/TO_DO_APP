import React, { useEffect } from "react";
import Header from "./Header";
import MenuBar from "./MenuBar";

const Layout = ({ title = "title", className, children }) => {
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <>
      <Header/>
      <MenuBar/>
      <div className={className}>{children}</div>
    </>
  );
};

export default Layout;