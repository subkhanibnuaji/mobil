"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG, DOMAINS } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDomains, setShowDomains] = useState(false);

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-secondary">ON</span>
            <span className="hidden sm:inline">{SITE_CONFIG.name}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="relative">
              <button
                onClick={() => setShowDomains(!showDomains)}
                className="hover:text-secondary transition-colors flex items-center gap-1"
              >
                Kategori
                <svg
                  className={`w-4 h-4 transition-transform ${showDomains ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showDomains && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white text-text rounded-lg shadow-xl border border-border py-2 max-h-96 overflow-y-auto">
                  {DOMAINS.map((domain) => (
                    <Link
                      key={domain.slug}
                      href={`/${domain.slug}`}
                      className="block px-4 py-2 hover:bg-background transition-colors"
                      onClick={() => setShowDomains(false)}
                    >
                      <span className="font-medium text-sm">{domain.name}</span>
                      <span className="block text-xs text-muted mt-0.5">
                        {domain.description}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/kalkulator" className="hover:text-secondary transition-colors">
              Kalkulator
            </Link>
            <Link href="/search" className="hover:text-secondary transition-colors">
              Cari
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-primary-light">
            <Link
              href="/kalkulator"
              className="block py-2 hover:text-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Kalkulator
            </Link>
            <Link
              href="/search"
              className="block py-2 hover:text-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Cari
            </Link>
            <div className="border-t border-primary-light mt-2 pt-2">
              <p className="text-xs text-gray-300 uppercase tracking-wider mb-2">Kategori</p>
              {DOMAINS.map((domain) => (
                <Link
                  key={domain.slug}
                  href={`/${domain.slug}`}
                  className="block py-1.5 text-sm hover:text-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {domain.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
