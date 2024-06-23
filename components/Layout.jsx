"use client"
import Nav from "./Nav";



const Layout = ({ children }) => {
  return (
    <div className="">
      <Nav/>
      {children}
    </div>
  )
};

export default Layout;
