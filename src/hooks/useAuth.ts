import { useContext } from "react";
import { AuthContext, AuthContextValue } from "@/context/authContext";

export const useAuth = (): AuthContextValue => useContext(AuthContext);
