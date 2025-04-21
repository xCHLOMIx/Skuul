import { GoBell, GoHome } from "react-icons/go";
import { VscLibrary } from "react-icons/vsc";
import { LuCrown } from "react-icons/lu";

interface theLink {
    id: number,
    icon: any,
    text: string,
    destination: string
}

export let links: theLink[] = [
    { id: 1, icon: <GoHome size={24} color='white' />, text: "Dashboard", destination: "/student/dashboard" },
    { id: 2, icon: <VscLibrary size={24} color='white' />, text: "Books", destination: "/student/books" },
    { id: 3, icon: <GoBell size={24} color='white' />, text: "Notifications", destination: "/student/notifications" },
    { id: 4, icon: <LuCrown size={24} color='white' />, text: "Leaderboard", destination: "/student/leaderboard" },
]