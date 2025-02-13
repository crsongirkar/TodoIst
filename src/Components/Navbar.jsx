import { MdOutlineMenu } from "react-icons/md";
import { LuMoonStar } from "react-icons/lu";
import { MdOutlineLightMode } from "react-icons/md";
import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";

const Navbar = () => {
    const { state, dispatch } = useContext(GlobalContext);

    const handleToggleSidebar = () => {
        dispatch({ type: "TOGGLE_SIDEBAR" });
    };

    const handleToggleTheme = () => {
        dispatch({ type: "TOGGLE_THEME" });
    }

    return (
        <div className={`w-full flex justify-between fixed items-center h-16 px-10 ${state.theme === "dark" ? "bg-[#000000FF] text-white" : "bg-[#FBFDFC] text-black"}`}>
            <div className=" flex gap-2 text-2xl">
                <br></br>
                <MdOutlineMenu className="hover:cursor-pointer" onClick={handleToggleSidebar} />
                <hr></hr>
                <h4> Personal Task Manager</h4>
            </div>
            <div className=" flex gap-4 text-2xl">
                {state.theme === "light" && <LuMoonStar className="hover:cursor-pointer" onClick={handleToggleTheme}/>}
                {state.theme === "dark" && <MdOutlineLightMode className="hover:cursor-pointer" onClick={handleToggleTheme}/>}
            </div>
        </div>
    );
};

export default Navbar;
