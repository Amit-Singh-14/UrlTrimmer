import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut, Home, BarChart3 } from "lucide-react";
import { UrlState } from "@/context";
import { logout } from "@/db/ApiAuth";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/useFetch";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.pathname);
    const { user, fetchUser } = UrlState();
    const { loading, fn: logoutUser } = useFetch(logout);

    return (
        <>
            <nav className="py-6 px-4 rounded-b-2xl flex justify-between items-center border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
                <Link to="/" className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                        {/* <img src="/logo.png" className="h-12 w-12" alt="Trimrr Logo" /> */}
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Trimrr</span>
                    </div>
                </Link>

                <div className="flex items-center gap-6">
                    {!user ? (
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" onClick={() => navigate("/auth")}>
                                Login
                            </Button>
                            <Button
                                onClick={() => navigate("/auth")}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                                Get Started
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            {location.pathname !== "/" && (
                                <Button
                                    variant={location.pathname === "/" ? "default" : "ghost"}
                                    onClick={() => navigate("/")}
                                    className="flex items-center gap-2"
                                >
                                    <Home className="h-4 w-4" />
                                    Home
                                </Button>
                            )}
                            {location.pathname !== "/dashboard" && (
                                <Button
                                    variant={location.pathname === "/dashboard" ? "default" : "ghost"}
                                    onClick={() => navigate("/dashboard")}
                                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                >
                                    <LinkIcon className="h-4 w-4" />
                                    My Links
                                </Button>
                            )}
                            <DropdownMenu>
                                <DropdownMenuTrigger className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all">
                                    <Avatar>
                                        <AvatarImage src={user?.user_metadata?.profile_pic} className="object-cover" />
                                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                            {user?.user_metadata?.name?.charAt(0) || user?.email?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user?.user_metadata?.name || "User"}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                                        <BarChart3 className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-red-600 focus:text-red-600"
                                        onClick={() => {
                                            logoutUser().then(() => {
                                                fetchUser();
                                                navigate("/auth");
                                            });
                                        }}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </div>
            </nav>
            {loading && <BarLoader className="mb-4" width={"100%"} color="#3b82f6" />}
        </>
    );
}

export default Header;
