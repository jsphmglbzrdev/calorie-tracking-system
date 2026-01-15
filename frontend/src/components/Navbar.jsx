import {useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {CircleUser, ChevronDown} from "lucide-react";

const Navbar = () => {
	const { logout, user } = useContext(AuthContext);

	const dropDownContent = [
		{ label: "Profile", type: "link", to: "/profile" },
		{ label: "Settings", type: "link", to: "/settings" },
		{ label: "Logout", type: "button", onClick: logout },
	];

  const [isActive, setActive] = useState(false);
  console.log(isActive);
  return (
      <div className="flex items-center sticky top-0 justify-between mb-4 py-2 px-5 bg-white rounded-2xl shadow-2xl">
        <div className="font-bold text-2xl text-green-600">KiloWise</div>

        <div className="flex items-center relative justify-center gap-2 ">
          <CircleUser color="green" />
          <div className="text-black text-sm font-semibold">{user}</div>

          <ChevronDown
            onClick={() => setActive(!isActive)}
            strokeWidth={1}
            className={`cursor-pointer transform transition-transform duration-200 ${
              isActive ? "rotate-180" : "rotate-0"
            }`}
          />

          {isActive && (
            <div className="absolute top-12 right-2 text-sm bg-white shadow-lg rounded-md p-2 group-hover:block">
              <div className="flex flex-col items-center ">
                {dropDownContent.map((value, index) => {
                  if (value.type === "link") {
                    return (
                      <Link
                        className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                        key={index}
                        to={value.to}
                      >
                        {value.label}
                      </Link>
                    );
                  } else if (value.type === "button") {
                    return (
                      <button
                        className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                        key={index}
                        onClick={value.onClick}
                      >
                        {value.label}
                      </button>
                    );
                  }
                })}
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default Navbar;
