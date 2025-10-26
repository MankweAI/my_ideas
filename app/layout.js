import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Idea Dashboard",
  description: "Track and analyze your startup ideas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Apply the classes directly to the body tag here */}
      <body className={`${inter.className} bg-background text-foreground`}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
