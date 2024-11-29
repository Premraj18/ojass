"use client"
import Foter from "./Footer2";
import Nav from "./Nav";


const Layout = ({ children }) => {
  return (
    <div className="">
      <Nav/>
      {children}
      {/* <Foter/> */}
    </div>
  )
};

export default Layout;
