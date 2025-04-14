import { GoBell, GoHome } from "react-icons/go";
import { VscLibrary } from "react-icons/vsc";
import { TbUsersGroup } from "react-icons/tb";
import { LuCrown } from "react-icons/lu";

interface theLink {
    id: number,
    icon: any,
    text: string,
    status: string,
    destination: string
}

export let links: theLink[] = [
    { id: 1, icon: <GoHome size={24} color='white' />, text: "Dashboard", status: "active", destination: "/admin/dashboard" },
    { id: 2, icon: <VscLibrary size={24} color='white' />, text: "Books", status: "inactive", destination: "/admin/books" },
    { id: 3, icon: <TbUsersGroup size={24} color='white' />, text: "Borrowers", status: "inactive", destination: "/admin/borrowers" },
    { id: 4, icon: <LuCrown size={24} color='white' />, text: "Leaderboard", status: "inactive", destination: "/admin/leaderboard" },
]