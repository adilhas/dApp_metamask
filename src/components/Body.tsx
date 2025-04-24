import Navbar from "./Navbar";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Body;
