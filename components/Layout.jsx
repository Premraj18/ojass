"use client"
import Foter from "./Footer2";
import Nav from "./Nav";
import { RecoilRoot } from 'recoil';


const Layout = ({ children }) => {
  return (
    <RecoilRoot>
      <div className="">
        <Nav/>
        {children}
        {/* <Foter/> */}
      </div>
    </RecoilRoot>
  )
};

export default Layout;
