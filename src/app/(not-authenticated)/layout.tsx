export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed h-full w-full bg-not-authenticated bg-cover">
      {children}
    </div>
  );
}
