import { useState } from "react";
import { Link } from "react-router-dom";

// ICONS //
import { LuBox, LuMessageSquare } from "react-icons/lu";
import { TbUsers } from "react-icons/tb";
import { RiQuestionLine } from "react-icons/ri";
import { IoStatsChartOutline } from "react-icons/io5";
import { LuAlarmCheck } from "react-icons/lu";

// ICONS //

function Sidbar() {
  const [activeLink, setActiveLink] = useState(0);
  const handleLinkClick = (index) => {
    setActiveLink(index);
  };
  const SIDEBAR_LINKS = [
    // { id: 1, path: "/", name: "الرئيسية", icon: LuBox },
    // {
    //   id: 2,
    //   path: "/statistics",
    //   name: "الإحصائيات",
    //   icon: IoStatsChartOutline,
    // },
    {
      id: 3,
      path: "/results",
      name: "النتائج",
      icon: IoStatsChartOutline,
    },
    { id: 4, path: "/users", name: "الأعضاء", icon: TbUsers },
    { id: 5, path: "/messages", name: "الرسائل", icon: LuMessageSquare },
    {
      id: 6,
      path: "/orders",
      name: "الطلبات",
      icon: LuBox,
    },
    {
      id: 7,
      path: "/CandidateLists",
      name: "طلبات الترشيح",
      icon: LuMessageSquare,
    },

    {
      id: 8,
      path: "/TimerAdmin",
      name: "المؤقت",
      icon: LuAlarmCheck,
    },

    {
      id: 9,
      path: "/faqs",
      name: "الاسئلة",
      icon: RiQuestionLine,
    },
  ];
  return (
    <div className="w-16 md:w-56 fixed right-0 top-0 z-10 h-screen boder-r pt-8 px-4 bg-white">
      {" "}
      {/* logo */}
      <div className="mb-8">
        <img src="/logo.svg" alt="logo" className="w-28 hidden md:flex" />
        <img src="/logo_mini.svg" alt="logo" className="w-8 flex md:hidden" />
      </div>
      {/* logo */}
      {/* Navigation Links */}
      <ul className="mt-6 space-y-6">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            key={index}
            className={`font-medium rounded-md py-2 px-5 hover:bg-red-50 hover:text-red-900 ${
              activeLink === index ? "bg-red-100 text-red-900" : ""
            }`}
          >
            <Link
              to={link.path}
              className="flex gap-1 justify-center md:justify-start items-center md:space-x-5"
              onClick={() => handleLinkClick(index)}
            >
              <span>{link.icon()}</span>
              <span className="text-sm text-gray-500 hidden md:flex">
                {link.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {/* Navigation Links */}
      {/* 
      <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center">
        <p className="flex items-center space-x-2 text-xs text-white py-2 px-5 bg-gradient-to-r from-red-900 to-violet-600 rounded-full">
          {" "}
          <span>?</span> <span className="hidden md:flex">Need Help</span>
        </p>
      </div> */}
    </div>
  );
}

export default Sidbar;
