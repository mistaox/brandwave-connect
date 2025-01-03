import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1A1F2C] text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">BrandCollab</h3>
            <p className="text-sm text-gray-400">
              Connecting brands with influencers for impactful collaborations.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-400 hover:text-white">About</Link>
              </li>
              <li>
                <Link to="/blogs" className="text-sm text-gray-400 hover:text-white">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-gray-400 hover:text-white">FAQ</Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-sm text-gray-400">
              Email: contact@brandcollab.com
            </p>
            <p className="text-sm text-gray-400">
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} BrandCollab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;