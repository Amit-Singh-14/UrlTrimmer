import { getCurrentUser } from "@/db/ApiAuth";
import useFetch from "@/hooks/useFetch";
import { createContext, useContext, useEffect } from "react";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
    const { data: user, error, fn: fetchUser, loading } = useFetch(getCurrentUser);

    const isAuthenticated = user?.role === "authenticated";

    useEffect(() => {
        if (user == null) fetchUser();
    }, []);

    return <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>{children}</UrlContext.Provider>;
};

export const UrlState = () => {
    return useContext(UrlContext);
};

export default UrlProvider;
