export default function Footer() {
  return (
    <footer className="border-t dark:border-zinc-800 border-zinc-100 mt-44">
      <div className="max-w-7xl mx-auto flex items-center justify-center md:px-16 px-6 py-8">
        <p className="text-zinc-500 text-sm font-sans">
          © {new Date().getFullYear()} Roshan Kharel
        </p>
      </div>
    </footer>
  );
}
