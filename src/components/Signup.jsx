import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Error from "./Error";
import { login, signup } from "@/db/ApiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/useFetch";
import { UrlState } from "@/context";

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
  // const { fetchUser } = UrlState();

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
        name: Yup.string().required("Name is Required."),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is requried."),
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
    <Card>
      <CardHeader>
        <CardTitle>SignUp</CardTitle>
        <CardDescription>create a jew account if you haven&rsquo;t already</CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter your Name"
            onChange={handleInputChange}
          />
        </div>
        {errors.name && <Error message={errors.name} />}
        <div className="space-y-1">
          <Input name="email" type="email" placeholder="Enter Email" onChange={handleInputChange} />
        </div>
        {errors.email && <Error message={errors.email} />}
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>
        {errors.password && <Error message={errors.password} />}
        <div className="space-y-1">
          <Input name="profile_pic" type="file" accept="image/*" onChange={handleInputChange} />
        </div>
        {errors.profile_pic && <Error message={errors.profile_pic} />}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignUp}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Create Account"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
