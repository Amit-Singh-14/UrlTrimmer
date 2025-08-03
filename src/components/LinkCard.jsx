/* eslint-disable react/prop-types */
import { Copy, Download, LinkIcon, Trash, ExternalLink, Calendar, MousePointer } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import useFetch from "@/hooks/useFetch";
import { BeatLoader } from "react-spinners";
import { deleteUrl } from "@/db/ApiUrl";
import { useState } from "react";

const LinkCard = ({ url = [], fetchUrls }) => {
    const [copied, setCopied] = useState(false);

    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title;

        const anchor = document.createElement("a");
        anchor.href = imageUrl;
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };

    const copyToClipboard = async () => {
        const shortUrl = `${import.meta.env.VITE_BASE_URL}/${url?.custom_url || url.short_url}`;
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url.id);

    return (
        <Card className="border-2 border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* QR Code */}
                    <div className="flex-shrink-0">
                        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-lg overflow-hidden border-2 border-blue-200 dark:border-blue-800 bg-white p-2">
                            <img src={url?.qr} className="w-full h-full object-contain" alt="QR code" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <Link to={`/link/${url?.id}`} className="block group">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors truncate">{url?.title}</h3>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                                    <ExternalLink className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">
                                        {import.meta.env.VITE_BASE_URL}/{url?.custom_url || url.short_url}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                    <LinkIcon className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">{url?.original_url}</span>
                                </div>

                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>{new Date(url?.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MousePointer className="h-3 w-3" />
                                        <span>View Analytics</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2 flex-shrink-0">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 hover:border-blue-300 dark:hover:bg-blue-950"
                        >
                            <Copy className="h-4 w-4" />
                            {copied ? "Copied!" : "Copy"}
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={downloadImage}
                            className="flex items-center gap-2  hover:border-green-300 dark:hover:bg-green-950"
                        >
                            <Download className="h-4 w-4" />
                            QR
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fnDelete().then(() => fetchUrls())}
                            disabled={loadingDelete}
                            className="flex items-center gap-2 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-950"
                        >
                            {loadingDelete ? (
                                <BeatLoader size={12} color="currentColor" />
                            ) : (
                                <>
                                    <Trash className="h-4 w-4" />
                                    Delete
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default LinkCard;
