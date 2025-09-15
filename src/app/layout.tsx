import type { Metadata } from "next";
import "./globals.css";
import { AppSidebar } from "@/components/layouts/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/layouts/header";

export const metadata: Metadata = {
  title: "Learning Next.js",
  description: "learning Next.js & React base knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <SidebarProvider
          style={
            {
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar />
          <SidebarInset>
            <Header />
            <main className="p-4">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
