import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Project Manager",
  description: "Task tracking made easy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Providers ke andar humne SessionProvider rakha hai */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}