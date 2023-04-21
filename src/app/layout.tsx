export const metadata = {
  title: 'SportsCentral',
  description: 'SportsCentral - Discover Great Sport Events',
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
