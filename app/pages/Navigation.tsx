import {  NavLink } from "react-router";
import { Button } from "~/components/ui/button";


const Navigation = () => {
  return (
    <div className="flex items-center space-x-2.5 text-stone-100 flex-col lg:flex-row gap-y-5 font-semibold">
        <NavLink to={"/vehicle"} className={({isActive})=>isActive ?"w-full lg:w-auto justify-between hover:bg-white/20 hover:text-white bg-white/30 outline-none px-3 py-2 rounded-lg text-center":" "}> Overview</NavLink>
        <NavLink to={"/webcam"} className={({isActive})=>isActive ?"w-full lg:w-auto justify-between hover:bg-white/20 hover:text-white bg-white/30 outline-none px-3 py-2 rounded-lg text-center":" "}>Webcam</NavLink>
    </div>
  )
}

export default Navigation;