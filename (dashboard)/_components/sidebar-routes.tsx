"use client";

import { BarChart, BookCheck, BookOpenCheck, Compass, Layout, List } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
    /*{
        icon: BookCheck,
        label: "Заняття",
        href: "/lesson",
    },*/
    {
        icon: Layout,
        label: "Мої курси",
        href: "/",
    },
    {
        icon: Compass,
        label: "Каталог курсів",
        href: "/search",
    },
]

const teacherRoutes = [
    {
        icon: BookOpenCheck,
        label: "Заняття",
        href: "/teacher/lessons"
    },
    {
        icon: List,
        label: "Курси",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Статистика",
        href: "/teacher/analytics",
    },
]

export const SidebarRoutes = () => {
    const pathname = usePathname();
    const isTeacher = pathname?.includes("/teacher");
    const routes = isTeacher ? teacherRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}