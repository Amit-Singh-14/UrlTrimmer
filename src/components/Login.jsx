import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Error from "./Error";
import { login } from "@/db/ApiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/useFetch";
import { UrlState } from "@/context";
import { User } from "lucide-react";

const Login = () => {
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const { loading, error, fn: fnLogin, data } = useFetch(login, formData);
    const { fetchUser } = UrlState();

    useEffect(() => {
        if (error == null && data) {
            fetchUser();
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
        }
    }, [error, data]);

    const handleLogin = async () => {
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
            });

            await schema.validate(formData, { abortEarly: false });
            await fnLogin();
        } catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    };

    const handleDemoLogin = () => {
        setFormData({
            email: "demo@trimrr.com",
            password: "demo123",
        });
    };

    return (
        <Card className="border-2 border-border/50">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
                <CardDescription className="text-base">Welcome back! Please sign in to your account</CardDescription>
                {error && <Error message={error.message} />}
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
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
                    <Input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="h-11 border-2 border-border/50 focus:border-blue-500 transition-colors"
                    />
                    {errors.password && <Error message={errors.password} />}
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
                <Button
                    onClick={handleLogin}
                    className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold"
                    disabled={loading}
                >
                    {loading ? <BeatLoader size={10} color="white" /> : "Sign In"}
                </Button>

                <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or</span>
                    </div>
                </div>

                <Button
                    variant="outline"
                    onClick={handleDemoLogin}
                    className="w-full h-11 border-2 border-blue-200 hover:border-blue-300  dark:border-blue-800 dark:hover:border-blue-700 dark:hover:bg-blue-950/20 transition-colors"
                    disabled={loading}
                >
                    <User className="mr-2 h-4 w-4" />
                    Try Demo Account
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Login;
