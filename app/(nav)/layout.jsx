import Nav from "../../components/navigationbar/bottomNav.jsx";
import { MdHome } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsCreditCard2FrontFill } from "react-icons/bs";

export const metadata = {
  title: "우리 커스터마이징",
  description: "우리 커스터마이징 서비스",
};

export default function NavLayout({ children }) {
  const menuItems = [
    { title: "홈", icon: <MdHome />, path: "/home" },
    { title: "카드", icon: <BsCreditCard2FrontFill />, path: "/my-card" },
    { title: "투자", icon: <FaChartLine />, path: "/piece-stock/home" },
    { title: "전체", icon: <GiHamburgerMenu />, path: "" },
  ]

  return (
    <>
      <div className="w-full h-[calc(100%-4rem)] bg-white overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative">
        {children}
      </div>
      <Nav menuItems={menuItems} />
    </>
  );
}
