import Header from "@/components/Header";
import SocialLinks from "@/components/SocialLinks";
import SocialLinksSimple from "@/components/SocialLinksSimple";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
            <main className="min-h-screen container relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-slate-800 bg-[size:20px_20px] opacity-20 pointer-events-none" />

                <div className="relative z-10">
                    <Header />
                    <Outlet />
                </div>

                {/* Floating Social Links */}
                <SocialLinks />
            </main>
        </div>
    );
};

export default AppLayout;
