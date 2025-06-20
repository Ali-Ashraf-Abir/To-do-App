import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/shared/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeColorProvider } from "@/context/theme/ThemeColorContext";
import ThemeSettingsPopUp from "@/components/ThemeSettingsPopUp";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} transition-colors duration-300`}>
        <AuthProvider>
          <ThemeColorProvider>
            <ThemeProvider>
              
              <Navbar />
              {children}
              <ThemeSettingsPopUp></ThemeSettingsPopUp>
            </ThemeProvider>
          </ThemeColorProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
