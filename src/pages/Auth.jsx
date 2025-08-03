import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { UrlState } from "@/context";
import { Link2, Shield, Zap } from "lucide-react";

function Auth() {
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");
    const navigate = useNavigate();

    const { isAuthenticated, loading } = UrlState();

    useEffect(() => {
        if (isAuthenticated && !loading) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
        }
    }, [isAuthenticated, loading, navigate]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
            <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Branding & Features */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            {longLink ? "Almost there!" : "Welcome to Trimrr"}
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            {longLink
                                ? "Please sign in to create your shortened URL"
                                : "Transform your long URLs into powerful short links with detailed analytics"}
                        </p>
                    </div>

                    {/* Demo Credentials Card */}
                    <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Try Demo Account
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-700 dark:text-blue-300">Email:</span>
                                    <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-blue-800 dark:text-blue-200">
                                        demo@trimrr.com
                                    </code>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-700 dark:text-blue-300">Password:</span>
                                    <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-blue-800 dark:text-blue-200">demo123</code>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Features */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-blue-100 dark:bg-blue-950 p-2">
                                <Link2 className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Smart URL Shortening</h3>
                                <p className="text-sm text-muted-foreground">Create memorable short links instantly</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-purple-100 dark:bg-purple-950 p-2">
                                <Zap className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Detailed Analytics</h3>
                                <p className="text-sm text-muted-foreground">Track clicks, locations, and performance</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-green-100 dark:bg-green-950 p-2">
                                <Shield className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Secure & Reliable</h3>
                                <p className="text-sm text-muted-foreground">Enterprise-grade security and uptime</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Auth Form */}
                <div className="w-full max-w-md mx-auto">
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="login" className="text-sm font-medium">
                                Sign In
                            </TabsTrigger>
                            <TabsTrigger value="signup" className="text-sm font-medium">
                                Sign Up
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <Login />
                        </TabsContent>
                        <TabsContent value="signup">
                            <Signup />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Auth;
