import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UrlState } from "@/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Error from "./Error";
import { Card } from "./ui/card";
import * as yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/useFetch";
import { createUrl } from "@/db/ApiUrl";
import { BeatLoader } from "react-spinners";
import { Plus, Link2, QrCode } from "lucide-react";

function CreateLink() {
    const { user } = UrlState();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const [error, setError] = useState([]);

    const [formValues, setFormValues] = useState({
        title: "",
        LongUrl: longLink ? longLink : "",
        customUrl: "",
    });

    const qrRef = useRef();

    const formSchema = yup.object().shape({
        title: yup.string().required("Title is required."),
        LongUrl: yup.string().url("Must be a valid URL").required("Long URL is required."),
        customUrl: yup.string(),
    });

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value,
        });
    };

    const { data, error: createUrlerror, fn: fbCreateUrl, loading } = useFetch(createUrl, { ...formValues, user_id: user.id });

    const createNewLink = async () => {
        setError([]);
        try {
            await formSchema.validate(formValues, { abortEarly: false });
            const canvas = qrRef.current.canvasRef.current;

            const blob = await new Promise((resolve) => canvas.toBlob(resolve));

            await fbCreateUrl(blob);
        } catch (error) {
            const newError = {};
            error?.inner?.forEach((err) => {
                newError[err.path] = err.message;
            });
            setError(newError);
        }
    };

    useEffect(() => {
        if (createUrlerror === null && data) {
            navigate(`/link/${data[0].id}`);
        }
    }, [createUrlerror, data]);

    return (
        <Dialog
            defaultOpen={longLink}
            onOpenChange={(res) => {
                if (!res) setSearchParams({});
            }}
        >
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Link
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                        <Link2 className="h-6 w-6 text-blue-600" />
                        Create New Link
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* QR Code Preview */}
                    {formValues?.LongUrl && (
                        <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <div className="text-center space-y-2">
                                <QRCode value={formValues.LongUrl} size={120} ref={qrRef} />
                                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                                    <QrCode className="h-3 w-3" />
                                    QR Code Preview
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-medium">
                                Link Title *
                            </Label>
                            <Input
                                id="title"
                                value={formValues.title}
                                onChange={handleChange}
                                placeholder="e.g., My Portfolio Website"
                                className="h-11 border-2 border-border/50 focus:border-blue-500 transition-colors"
                            />
                            {error.title && <Error message={error.title} />}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="LongUrl" className="text-sm font-medium">
                                Long URL *
                            </Label>
                            <Input
                                id="LongUrl"
                                value={formValues.LongUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/very/long/url"
                                className="h-11 border-2 border-border/50 focus:border-blue-500 transition-colors"
                            />
                            {error.LongUrl && <Error message={error.LongUrl} />}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="customUrl" className="text-sm font-medium">
                                Custom Short URL (Optional)
                            </Label>
                            <div className="flex items-center gap-2">
                                <Card className="px-3 py-2 bg-muted text-muted-foreground text-sm font-mono">trimrr.in/</Card>
                                <Input
                                    id="customUrl"
                                    value={formValues.customUrl}
                                    onChange={handleChange}
                                    placeholder="my-custom-link"
                                    className="h-11 border-2 border-border/50 focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">Leave empty for auto-generated short URL</p>
                        </div>
                    </div>

                    {createUrlerror && <Error message={createUrlerror.message} />}
                </div>

                <DialogFooter>
                    <Button
                        disabled={loading}
                        onClick={createNewLink}
                        className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold"
                    >
                        {loading ? <BeatLoader size={10} color="white" /> : "Create Short Link"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CreateLink;
