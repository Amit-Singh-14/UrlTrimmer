import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link2, BarChart3, Shield, Zap } from "lucide-react";

function LandingPage() {
    const [longUrl, setLongUrl] = useState("");
    const navigate = useNavigate();

    const handleShorten = (e) => {
        e.preventDefault();
        if (longUrl) {
            navigate(`/auth?createNew=${longUrl}`);
        }
    };

    const features = [
        {
            icon: <Link2 className="h-8 w-8 text-blue-600" />,
            title: "Smart URL Shortening",
            description: "Transform long URLs into clean, memorable short links instantly",
        },
        {
            icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
            title: "Detailed Analytics",
            description: "Track clicks, locations, devices, and performance metrics",
        },
        {
            icon: <Shield className="h-8 w-8 text-green-600" />,
            title: "Secure & Reliable",
            description: "Enterprise-grade security with 99.9% uptime guarantee",
        },
        {
            icon: <Zap className="h-8 w-8 text-yellow-600" />,
            title: "Lightning Fast",
            description: "Instant redirects with global CDN for optimal performance",
        },
    ];

    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <div className="text-center max-w-4xl mx-auto mb-16">
                <div className="mb-8">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
                        Shorten URLs with
                        <span className="block">Style & Analytics</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Transform your long URLs into powerful short links with detailed analytics, custom domains, and professional branding.
                    </p>
                </div>

                {/* URL Shortener Form */}
                <div className="mb-12">
                    <form onSubmit={handleShorten} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                        <div className="flex-1">
                            <Input
                                type="url"
                                placeholder="Paste your long URL here..."
                                value={longUrl}
                                onChange={(e) => setLongUrl(e.target.value)}
                                className="h-14 text-lg px-6 border-2 border-border/50 focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold"
                        >
                            Shorten URL
                        </Button>
                    </form>

                    {/* Demo Credentials Notice */}
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            <strong>Try it now!</strong> Use demo credentials - Email:{" "}
                            <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">demo@trimrr.com</code> Password:{" "}
                            <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">demo123</code>
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="w-full max-w-6xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Trimrr?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-2 border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg">
                            <CardContent className="p-6 text-center">
                                <div className="mb-4 flex justify-center">{feature.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                <Accordion type="multiple" className="w-full">
                    <AccordionItem value="item-1" className="border-2 border-border/50">
                        <AccordionTrigger className="text-left hover:text-blue-600 transition-colors">
                            How does the Trimrr URL shortener work?
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            When you enter a long URL, our system generates a shorter version of that URL. This shortened URL redirects to the
                            original long URL when accessed. We also provide detailed analytics about each click.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-2 border-border/50">
                        <AccordionTrigger className="text-left hover:text-blue-600 transition-colors">
                            Do I need an account to use the app?
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            Yes. Creating an account allows you to manage your URLs, view analytics, and customize your short URLs. You can try our
                            demo account with email: demo@trimrr.com and password: demo123
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-2 border-border/50">
                        <AccordionTrigger className="text-left hover:text-blue-600 transition-colors">
                            What analytics are available for my shortened URLs?
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            You can view the number of clicks, geolocation data of the clicks, device types (mobile/desktop), referrer information,
                            and time-based analytics for each of your shortened URLs.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-2 border-border/50">
                        <AccordionTrigger className="text-left hover:text-blue-600 transition-colors">
                            Can I customize my short URLs?
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            Yes! You can create custom short URLs with meaningful names that are easy to remember and share. This helps with branding
                            and makes your links more professional.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}

export default LandingPage;
