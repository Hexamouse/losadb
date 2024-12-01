import localFont from "next/font/local";
import "./globals.css";

const JetBrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Regular.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const JetBrainsBold = localFont({
  src: "./fonts/JetBrainsMono-ExtraBold.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Lost Saga Database",
  description: "a Web Database for Lost Saga (Character, Item, Tools)",
  icons: {
    icon: "./favicon.ico", // Link to your favicon
    apple: "/apple-touch-icon.png", // For Apple devices
    type: "image/x-icon", // MIME type for favicon.ico
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${JetBrainsMono.variable} ${JetBrainsBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}