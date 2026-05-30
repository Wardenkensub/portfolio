import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://kenjisubagja.my.id"),
  title: "Kenji Subagja | Bug Bounty Hunter & Web Developer",
  description:
    "Explore my developer projects, secure web applications, and verified bug bounty findings.",
  openGraph: {
    title: "Kenji Subagja | Bug Bounty Hunter & Web Developer",
    description:
      "Explore my developer projects, secure web applications, and verified bug bounty findings.",
    type: "website",
    url: "https://kenjisubagja.my.id",
    siteName: "Kenji Portfolio",
    images: ["https://kenjisubagja.my.id/icon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
