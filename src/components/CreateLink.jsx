import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UrlState } from "@/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import * as yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/useFetch";
import { createUrl } from "@/db/ApiUrl";
import { BeatLoader } from "react-spinners";

function CreateLink() {
  const { user } = UrlState();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [error, setError] = useState([]);

  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const qrRef = useRef();

  const formSchema = yup.object().shape({
    title: yup.string().required("Title is requried."),
    longUrl: yup.string().url("Must be a valid URL").required("Long URl is required."),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    data,
    error: createUrlerror,
    fn: fbCreateUrl,
    loading,
  } = useFetch(createUrl, { ...formValues, user_id: user.id });

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
        <Button variant="destructive"> Create new Link</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
        </DialogHeader>

        {formValues?.longUrl && <QRCode value={formValues.longUrl} size={150} ref={qrRef} />}

        <Input
          id="title"
          value={formValues.title}
          onChange={handleChange}
          placeholder="Short Link's Title"
        />
        {error.title && <Error message={error.title} />}

        <Input
          id="longUrl"
          value={formValues.longUrl}
          onChange={handleChange}
          placeholder="Enter your loonggg URL"
        />
        {error.longUrl && <Error message={error.longUrl} />}

        <div className=" flex items-center gap-2">
          <Card className="p-2"> trimmer.in </Card>/
          <Input
            id="customUrl"
            value={formValues.customUrl}
            onChange={handleChange}
            placeholder="Custom Link(optional)"
          />
        </div>

        {createUrlerror && <Error message={createUrlerror.message} />}
        <DialogFooter className="sm:justify-start">
          <Button disable={loading} onClick={createNewLink} variant="destructive">
            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateLink;
