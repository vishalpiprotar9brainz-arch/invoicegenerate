import React from 'react';

export default function Footer() {
  const navigateAndScroll = (e, id) => {
    e.preventDefault();
    if (window.location.hash === '#privacy' || window.location.hash === '#terms') {
      window.location.hash = ''; // This triggers App to switch to 'home'
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, null, `#${id}`);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16 no-print">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Invoice Generator Logo" className="w-8 h-8 object-contain bg-white rounded-md p-1" />
              <span className="text-xl font-bold tracking-tight text-white">Invoice Generator</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Making professional invoicing accessible, fast, and completely free for freelancers and businesses worldwide.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#generator-tool" onClick={(e) => navigateAndScroll(e, 'generator-tool')} className="text-sm text-gray-400 hover:text-white transition-colors">Create Invoice</a>
                  </li>
                  <li>
                    <a href="#template-selector" onClick={(e) => navigateAndScroll(e, 'template-selector')} className="text-sm text-gray-400 hover:text-white transition-colors">Templates</a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Features</h3>
                <ul className="space-y-3">
                  <li>
                    <button onClick={(e) => navigateAndScroll(e, 'feature-pdf-export')} className="text-sm text-gray-400 hover:text-white transition-colors">PDF Export</button>
                  </li>
                  <li>
                    <button onClick={(e) => navigateAndScroll(e, 'feature-live-preview')} className="text-sm text-gray-400 hover:text-white transition-colors">Live Preview</button>
                  </li>
                  <li>
                    <button onClick={(e) => navigateAndScroll(e, 'feature-no-registration')} className="text-sm text-gray-400 hover:text-white transition-colors">No Registration</button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="mailto:support@invoicegenerator.com" className="text-sm text-gray-400 hover:text-white transition-colors">support@invoicegenerator.com</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Invoice Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
