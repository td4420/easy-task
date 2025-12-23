// ** React Imports
import auth from "@/config/firebase";
import {
  ACCESS_TOKEN,
  HOME_PAGE,
  INVALID_CREDIT,
  LOGIN_PAGE,
} from "@/utils/const";
import { deleteCookie, setCookie } from "cookies-next";
import { FirebaseError } from "firebase/app";
import { User, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ReactNode, createContext } from "react";
import { toast } from "react-toastify";

export type AuthContextValue = {
  user: User | null;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
};

const initialAuthState: AuthContextValue = {
  user: null,
  signInWithPassword: () => Promise.resolve(),
  handleLogout: () => Promise.resolve(),
};

// ** Create Context
export const AuthContext = createContext<AuthContextValue>({
  ...initialAuthState,
});

export const AuthProvider = ({
  user,
  children,
}: {
  user: User | null;
  children: ReactNode;
}) => {
  // ** State
  const router = useRouter();

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const accessToken = await user.getIdToken();
      setCookie(ACCESS_TOKEN, accessToken);

      return;
    }

    deleteCookie(ACCESS_TOKEN);
  });

  const signInWithPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(HOME_PAGE);
      toast.success("Login successfully");
    } catch (error) {
      const errorData = error as FirebaseError;
      console.log(errorData);
      if (errorData.code == INVALID_CREDIT) {
        toast.error("Email or password are wrong");
      } else {
        toast.error("Can not login right now");
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push(LOGIN_PAGE);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, signInWithPassword, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
