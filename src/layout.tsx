// Make a simple sharp tailwind css layout
// with a container
// have a stylish box deaign border
// grey bg
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-200 h-screen w-screen py-36">
      <div className="container mx-auto px-2">{children}</div>
    </div>
  );
}
