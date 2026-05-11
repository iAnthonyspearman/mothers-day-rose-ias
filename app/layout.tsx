import "./globals.css";

export const metadata = {
  title: "Happy Mother's Day",
  description: "A Mother's Day rose garden gift",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
