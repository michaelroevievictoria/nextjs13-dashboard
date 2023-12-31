'use client';
import classNames from "classnames";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useMemo, MouseEventHandler } from "react";
import {
    ArticleIcon,
    CollapsIcon,
    HomeIcon,
    LogoIcon,
    LogoutIcon,
    UsersIcon,
    VideosIcon,
} from "../icons";

interface MenuItem {
    id: number;
    label: string;
    icon: typeof HomeIcon | any; // Assuming all your icons are React components with similar signatures
    link: string;
}

const menuItems: MenuItem[] = [
    { id: 1, label: "Home", icon: HomeIcon, link: "/" },
    { id: 2, label: "Manage Posts", icon: ArticleIcon, link: "/home" },
    { id: 3, label: "Manage Users", icon: UsersIcon, link: "/users" },
    { id: 4, label: "Manage Tutorials", icon: VideosIcon, link: "/tutorials" },
];

const Sidebar: React.FC = () => {
    const [toggleCollapse, setToggleCollapse] = useState<boolean>(false);
    const [isCollapsible, setIsCollapsible] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();


    const activeMenu = useMemo(
        () => menuItems.find((menu) => menu.link === pathname),
        [pathname]
    );

    const wrapperClasses = classNames(
        "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col",
        {
            ["w-80"]: !toggleCollapse,
            ["w-20"]: toggleCollapse,
        }
    );

    const collapseIconClasses = classNames(
        "p-4 rounded bg-light-lighter absolute right-0",
        {
            "rotate-180": toggleCollapse,
        }
    );

    const getNavItemClasses = (menu: Partial<MenuItem>) => {
        return classNames(
            "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
            {
                ["bg-light-lighter"]: activeMenu?.id === menu.id,
            }
        );
    };

    const onMouseOver: MouseEventHandler<HTMLDivElement> = () => {
        setIsCollapsible(!isCollapsible);
    };

    const handleSidebarToggle = () => {
        setToggleCollapse(!toggleCollapse);
    };

    return (
        <div
            className={wrapperClasses}
            onMouseEnter={onMouseOver}
            onMouseLeave={onMouseOver}
            style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
        >
            <div className="flex flex-col">
                <div className="flex items-center justify-between relative">
                    <div className="flex items-center pl-1 gap-4">
                        <LogoIcon />
                        <span
                            className={classNames("mt-2 text-lg font-medium text-text", {
                                hidden: toggleCollapse,
                            })}
                        >
                            Logo
                        </span>
                    </div>
                    {isCollapsible && (
                        <button
                            className={collapseIconClasses}
                            onClick={handleSidebarToggle}
                        >
                            <CollapsIcon />
                        </button>
                    )}
                </div>

                <div className="flex flex-col items-start mt-24">
                    {menuItems.map(({ icon: Icon, ...menu }) => {
                        const classes = getNavItemClasses(menu);
                        return (
                            <div className={classes}>
                                <Link href={menu.link} className="flex py-4 px-3 items-center w-full h-full">
                                    <div style={{ width: "2.5rem" }}>
                                        <Icon />
                                    </div>
                                    {!toggleCollapse && (
                                        <span className={classNames("text-md font-medium text-text-light")}>
                                            {menu.label}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={`${getNavItemClasses({})} px-3 py-4`}>
                <div style={{ width: "2.5rem" }}>
                    <LogoutIcon />
                </div>
                {!toggleCollapse && (
                    <span className={classNames("text-md font-medium text-text-light")}>
                        Logout
                    </span>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
