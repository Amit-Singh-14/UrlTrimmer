import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Error from "./Error";
import { signup } from "@/db/ApiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/useFetch";
import { UrlState } from "@/context";
import { UserPlus, Upload } from "lucide-react";

const SignUp = () => {
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const navigate = useNavigate();
    const { fetchUser } = UrlState();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        profile_pic: null,
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };

    const { loading, error, fn: fnSignup, data } = useFetch(signup, formData);

    useEffect(() => {
        if (error == null && data) {
            fetchUser();
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
        }
    }, [error, data]);

    const handleSignUp = async () => {
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required("Name is required."),
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
                profile_pic: Yup.mixed().required("Profile picture is required."),
            });

            await schema.validate(formData, { abortEarly: false });
            await fnSignup();
        } catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    };

    return (
        <Card className="border-2 border-border/50">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                <CardDescription className="text-base">Join Trimrr to start shortening URLs with analytics</CardDescription>
                {error && <Error message={error.message} />}
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                        Full Name *
                    </Label>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="h-11 border-2 border-border/50 focus:border-blue-500 transition-colors"
                    />
                    {errors.name && <Error message={errors.name} />}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                    </Label>
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-11 border-2 border-border/50 focus:border-blue-500 transition-colors"
                    />
                    {errors.email && <Error message={errors.email} />}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                        Password *
                    </Label>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="h-11 border-2 border-border/50 focus:border-blue-500 transition-colors"
                    />
                    {errors.password && <Error message={errors.password} />}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="profile_pic" className="text-sm font-medium">
                        Profile Picture *
                    </Label>
                    <div className="relative">
                        <Input
                            name="profile_pic"
                            type="file"
                            accept="image/*"
                            onChange={handleInputChange}
                            className="h-11 border-2 border-border/50 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-950 dark:file:text-blue-300"
                        />
                        <Upload className="absolute right-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                    </div>
                    {errors.profile_pic && <Error message={errors.profile_pic} />}
                    <p className="text-xs text-muted-foreground">Upload a profile picture (JPG, PNG, GIF)</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={handleSignUp}
                    className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold"
                    disabled={loading}
                >
                    {loading ? (
                        <BeatLoader size={10} color="white" />
                    ) : (
                        <>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Create Account
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default SignUp;
