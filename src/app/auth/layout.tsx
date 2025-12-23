import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "@/app/providers";
import { Header } from "@/components/Layouts/header";
import auth from "@/config/firebase";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <Providers user={auth.currentUser}>
      <NextTopLoader color="#5750F1" showSpinner={false} />

      <div className="flex min-h-screen">
        <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
          <Header />
          <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}
