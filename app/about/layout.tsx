import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Roshan Kharel",
  metadataBase: new URL("https://roshankharel.com/about"),
  description:
    "Learn more about my skills, experience and technical background",
  openGraph: {
    title: "About | Roshan Kharel",
    url: "https://roshankharel.com/about",
    description:
      "Learn more about my skills, experience and technical background",
    images:
      "https://res.cloudinary.com/geekyroshan/image/upload/v1692635746/roshankharel/og.png",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
