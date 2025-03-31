import { GoHomeFill, GoBell } from "react-icons/go";
import { VscLibrary } from "react-icons/vsc";

interface theLink {
    id: number,
    icon: any,
    text: string,
    status: string,
    destination: string
}

export let links: theLink[] = [
    { id: 1, icon: <GoHomeFill size={24} color='white' />, text: "Dashboard", status: "active", destination: "/admin/dashboard" },
    { id: 2, icon: <GoBell size={24} color='white' />, text: "Notifications", status: "inactive", destination: "/admin/books" },
    { id: 3, icon: <VscLibrary size={24} color='white' />, text: "Books", status: "inactive", destination: "/admin/books" },
]