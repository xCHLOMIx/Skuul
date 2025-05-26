import { GoHome } from "react-icons/go";
import { VscLibrary } from "react-icons/vsc";
import { TbUsersGroup } from "react-icons/tb";
import { LuBookMinus, LuCrown } from "react-icons/lu";
import { LuBookPlus } from "react-icons/lu";

interface theLink {
    id: number,
    icon: any,
    text: string,
    destination: string
}

export let links: theLink[] = [
    { id: 1, icon: <GoHome size={24} color='white' />, text: "Dashboard", destination: "/admin/dashboard" },
    { id: 2, icon: <VscLibrary size={24} color='white' />, text: "Books", destination: "/admin/books" },
    { id: 3, icon: <TbUsersGroup size={24} color='white' />, text: "Borrowers", destination: "/admin/borrowers" },
    { id: 4, icon: <LuCrown size={24} color='white' />, text: "Leaderboard", destination: "/admin/leaderboard" },
    { id: 5, icon: <LuBookPlus size={24} color='white' />, text: "Borrow books", destination: "/book/borrow" },
    { id: 6, icon: <LuBookMinus size={24} color='white' />, text: "Return books", destination: "/book/return" },
]