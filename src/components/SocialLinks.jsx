import React, { useState } from "react";
import { Github, Linkedin, Globe, ExternalLink, User } from "lucide-react";

const SocialLinks = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    // 🔥 UPDATE THESE URLs WITH YOUR ACTUAL LINKS 🔥
    const socialLinks = [
        {
            name: "GitHub",
            url: "https://github.com/Amit-Singh-14", // 👈 Replace with your GitHub URL
            icon: <Github className="h-5 w-5" />,
            hoverColor: "hover:bg-gray-800 hover:text-white hover:shadow-gray-800/50",
            description: "View my code",
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/amit-singh1405/", // 👈 Replace with your LinkedIn URL
            icon: <Linkedin className="h-5 w-5" />,
            hoverColor: "hover:bg-blue-600 hover:text-white hover:shadow-blue-600/50",
            description: "Connect with me",
        },
        // {
        //     name: "Portfolio",
        //     url: "https://yourportfolio.com", // 👈 Replace with your portfolio URL
        //     icon: <Globe className="h-5 w-5" />,
        //     hoverColor: "hover:bg-purple-600 hover:text-white hover:shadow-purple-600/50",
        //     description: "See my work",
        // },
    ];

    return (
        <div className="fixed right-3 lg:right-6 top-1/2 transform -translate-y-1/2 z-50">
            <div className="flex flex-col items-center space-y-3 lg:space-y-4">
                {/* Main toggle button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="group relative p-2.5 lg:p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-95"
                    aria-label="Toggle social links"
                >
                    <User className="h-4 w-4 lg:h-5 lg:w-5" />

                    {/* Pulse animation */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-ping opacity-20"></div>

                    {/* Tooltip */}
                    <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
                            Connect with me
                            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                        </div>
                    </div>
                </button>

                {/* Social links */}
                <div
                    className={`flex flex-col space-y-3 transition-all duration-500 ease-in-out ${
                        isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
                >
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                                group relative p-2.5 lg:p-3 rounded-full 
                                bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 text-slate-300
                                ${link.hoverColor}
                                transition-all duration-300 ease-in-out
                                hover:scale-110 hover:shadow-lg hover:border-transparent
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950
                                transform hover:-translate-x-1 active:scale-95
                                min-h-[44px] min-w-[44px] flex items-center justify-center
                            `}
                            aria-label={`Visit my ${link.name}`}
                        >
                            <div className="h-4 w-4 lg:h-5 lg:w-5">{link.icon}</div>

                            {/* Tooltip */}
                            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
                                    <div className="font-semibold">{link.name}</div>
                                    <div className="text-xs text-gray-300">{link.description}</div>
                                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                                </div>
                            </div>

                            {/* External link indicator */}
                            <ExternalLink className="absolute -top-1 -right-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>
                    ))}
                </div>

                {/* Decorative elements */}
                {/* <div className={`transition-all duration-500 ${isExpanded ? "opacity-100" : "opacity-30"}`}>
                    <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-purple-500 mx-auto"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-2"></div>
                </div> */}
            </div>
        </div>
    );
};

export default SocialLinks;
