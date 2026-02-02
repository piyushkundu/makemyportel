import type { Metadata } from "next";
import AdminLayout from "@/components/AdminLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import './admin.css';

export const metadata: Metadata = {
    title: "Admin Panel - MakeMyPortal",
    description: "Admin dashboard for managing MakeMyPortal services and clients",
};

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider>
            <AdminLayout>
                {children}
            </AdminLayout>
        </ThemeProvider>
    );
}
