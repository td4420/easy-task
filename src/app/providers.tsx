"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/authContext";
import { User } from "firebase/auth";

export function Providers({ user, children }: { user: User | null; children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <AuthProvider user={user}>
        <SidebarProvider>{children}</SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
