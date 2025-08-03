import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Filter, Link2, MousePointer, TrendingUp, Plus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context";
import useFetch from "@/hooks/useFetch";
import { getClicksForUrls } from "@/db/ApiClicks";
import LinkCard from "@/components/LinkCard";
import { getUrls } from "@/db/ApiUrl";
import { Input } from "@/components/ui/input";
import CreateLink from "@/components/CreateLink";
import Error from "@/components/Error";

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = UrlState();
    const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user.id);

    const {
        loading: loadingClicks,
        data: clicks,
        fn: fnClicks,
    } = useFetch(
        getClicksForUrls,
        urls?.map((url) => url.id)
    );

    useEffect(() => {
        fnUrls();
    }, []);

    const filteredUrls = urls?.filter((url) => url.title.toLowerCase().includes(searchQuery.toLowerCase()));

    useEffect(() => {
        if (urls?.length) fnClicks();
    }, [urls?.length]);

    // Calculate stats
    const totalClicks = clicks?.length || 0;
    const totalUrls = urls?.length || 0;
    const avgClicksPerUrl = totalUrls > 0 ? Math.round(totalClicks / totalUrls) : 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {(loading || loadingClicks) && <BarLoader width={"100%"} color="#3b82f6" />}

            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Welcome back, {user?.user_metadata?.name || "User"}!
                </h1>
                <p className="text-muted-foreground">Manage your shortened URLs and track their performance</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border-2 border-border/50 hover:border-blue-500/50 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Links</CardTitle>
                        <Link2 className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{totalUrls}</div>
                        <p className="text-xs text-muted-foreground">URLs shortened</p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-border/50 hover:border-purple-500/50 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Clicks</CardTitle>
                        <MousePointer className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">{totalClicks}</div>
                        <p className="text-xs text-muted-foreground">Clicks received</p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-border/50 hover:border-green-500/50 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Clicks/Link</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{avgClicksPerUrl}</div>
                        <p className="text-xs text-muted-foreground">Performance metric</p>
                    </CardContent>
                </Card>
            </div>

            {/* Links Management Section */}
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">My Links</h2>
                        <p className="text-muted-foreground">
                            {totalUrls > 0 ? `Manage your ${totalUrls} shortened URLs` : "Create your first shortened URL"}
                        </p>
                    </div>
                    <CreateLink />
                </div>

                {/* Search/Filter */}
                <div className="relative max-w-md">
                    <Input
                        type="text"
                        placeholder="Search links by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-4 pr-10 h-11 border-2 border-border/50 focus:border-blue-500 transition-colors"
                    />
                    <Filter className="absolute top-3 right-3 h-5 w-5 text-muted-foreground" />
                </div>

                {/* Error Display */}
                {error && <Error message={error?.message} />}

                {/* Links List */}
                <div className="space-y-4">
                    {filteredUrls && filteredUrls.length > 0 ? (
                        filteredUrls.map((url, i) => <LinkCard key={i} url={url} fetchUrls={fnUrls} />)
                    ) : !loading && totalUrls === 0 ? (
                        <Card className="border-2 border-dashed border-border/50 p-12 text-center">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="rounded-full bg-blue-100 dark:bg-blue-950 p-4">
                                    <Plus className="h-8 w-8 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">No links yet</h3>
                                    <p className="text-muted-foreground mb-4">Create your first shortened URL to get started</p>
                                    <CreateLink />
                                </div>
                            </div>
                        </Card>
                    ) : !loading && filteredUrls?.length === 0 ? (
                        <Card className="border-2 border-border/50 p-8 text-center">
                            <p className="text-muted-foreground">No links match your search. Try a different search term.</p>
                        </Card>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
