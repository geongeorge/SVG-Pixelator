import { CodeBracketIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="py-6 text-center text-sm text-slate-500 mt-50">
      <div className="flex items-center justify-center gap-2">
        <span>Made with ♥️</span>
        <a
          href="https://github.com/geongeorge/SVG-Pixelator"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-700 transition-colors"
        >
          <CodeBracketIcon className="w-4 h-4" />
          <span>geongeorge / SVG-Pixelator</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
