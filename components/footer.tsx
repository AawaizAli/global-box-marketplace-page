"use client"

import { Twitter, Instagram, Linkedin, Facebook, Youtube, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Partner Line */}
        <div className="text-center mb-12 pb-8 border-b border-border">
          <p className="text-sm font-semibold text-muted-foreground">
            OFFICIAL PARTNER OF THE ROMANIAN RUGBY FEDERATION
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">GLOBALBOX</h3>
            <p className="text-sm text-muted-foreground">
              Connecting global commerce and enabling businesses worldwide to buy, sell, and grow.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:support@globalbox.world" className="hover:text-primary transition-colors">
                  support@globalbox.world
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Become a Seller
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">SUPPORT</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">LEGAL</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Slogans */}
        <div className="text-center mb-12 space-y-3 py-8 border-y border-border">
          <p className="text-lg font-bold">OUR PLATFORM - YOUR BUSINESS</p>
          <p className="text-lg font-bold">YOUR SUCCESS - OUR PRIORITY</p>
          <p className="text-lg font-bold">BUY / SELL / PROMOTE / ANYTHING / ANYTIME / ANYWHERE</p>
          <p className="text-xs text-muted-foreground mt-4">
            * GlobalBox will not permit or tolerate the commercialization of illegal or inappropriate items.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mb-12 pb-8 border-b border-border flex-wrap">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
            HOME
          </a>
          <a
            href="https://twitter.com/OfficialGlobalBox"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <Twitter className="w-4 h-4" />
            <span className="text-sm font-medium">Twitter</span>
          </a>
          <a
            href="https://instagram.com/globalbox_world"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            <span className="text-sm font-medium">Instagram</span>
          </a>
          <a
            href="https://linkedin.com/company/globalbox-world"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
          <a
            href="https://facebook.com/OfficialGlobalBox"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <Facebook className="w-4 h-4" />
            <span className="text-sm font-medium">Facebook</span>
          </a>
          <a
            href="https://youtube.com/channel/UC-jROZQGqqDkqltU-qHeLmw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <Youtube className="w-4 h-4" />
            <span className="text-sm font-medium">YouTube</span>
          </a>
        </div>

        {/* Partners */}
        <div className="text-center mb-8">
          <h4 className="font-bold mb-6">OUR TRUSTED PARTNERS</h4>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              FedEx
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              PayTm
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              MasterCard
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Visa
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Rugby Romania
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Global Chamber of Commerce & Industry
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-muted-foreground">© 2015–2025 GLOBALBOX.WORLD ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  )
}
