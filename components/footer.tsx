"use client"

import { Twitter, Instagram, Linkedin, Facebook, Youtube, Mail, Phone, MapPin, Globe, Award, Shield } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="relative bg-gradient-to-br from-card via-card/95 to-card/90 border-t border-border/50 mt-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary opacity-60"></div>
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Partner Line */}
        <div className="text-center mb-12 pb-8 border-b border-border/50">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl px-6 py-3 backdrop-blur-sm border border-primary/20">
            <Award className="w-5 h-5 text-primary" />
            <p className="text-sm font-bold text-foreground">
              {t('officialPartner')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">GLOBALBOX</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('companyDescription')}
              </p>
            </div>
            
            {/* Contact Information with Enhanced Styling */}
            <div className="space-y-3">
              <div className="group flex items-center gap-3 p-3 bg-gradient-to-r from-white/50 via-white/30 to-white/50 rounded-2xl hover:from-primary/10 hover:to-accent/10 transition-all duration-300 border border-white/20 hover:border-primary/30">
                <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <a href="mailto:support@globalbox.world" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  support@globalbox.world
                </a>
              </div>
              <div className="group flex items-center gap-3 p-3 bg-gradient-to-r from-white/50 via-white/30 to-white/50 rounded-2xl hover:from-primary/10 hover:to-accent/10 transition-all duration-300 border border-white/20 hover:border-primary/30">
                <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <a href="tel:+1234567890" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="group flex items-center gap-3 p-3 bg-gradient-to-r from-white/50 via-white/30 to-white/50 rounded-2xl hover:from-primary/10 hover:to-accent/10 transition-all duration-300 border border-white/20 hover:border-primary/30">
                <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  Global Headquarters
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              {t('quickLinks')}
            </h4>
            <div className="space-y-3">
              {[
                { label: t('aboutUs'), href: '#' },
                { label: t('howItWorks'), href: '#' },
                { label: t('becomeSeller'), href: '#' },
                { label: t('contactUs'), href: '#' }
              ].map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="group flex items-center gap-2 p-2 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              {t('support')}
            </h4>
            <div className="space-y-3">
              {[
                { label: t('helpCenter'), href: '#' },
                { label: t('shippingInfo'), href: '#' },
                { label: t('returnsRefunds'), href: '#' },
                { label: t('faq'), href: '#' }
              ].map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="group flex items-center gap-2 p-2 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              {t('legal')}
            </h4>
            <div className="space-y-3">
              {[
                { label: t('privacyPolicy'), href: '#' },
                { label: t('termsOfService'), href: '#' },
                { label: t('cookiePolicy'), href: '#' },
                { label: t('compliance'), href: '#' }
              ].map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="group flex items-center gap-2 p-2 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Slogans */}
        <div className="text-center mb-12 space-y-6 py-8 border-y border-border/50">
          <div className="space-y-4">
            <p className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('ourPlatformYourBusiness')}
            </p>
            <p className="text-xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              {t('yourSuccessOurPriority')}
            </p>
            <p className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('buySellPromote')}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 rounded-2xl px-6 py-3 backdrop-blur-sm border border-border/50">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground font-medium">
              {t('disclaimer')}
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 mb-12 pb-8 border-b border-border/50 flex-wrap">
          <a 
            href="#" 
            className="group px-4 py-2 bg-gradient-to-r from-white/50 via-white/30 to-white/50 rounded-2xl hover:from-primary/10 hover:to-accent/10 transition-all duration-300 border border-white/20 hover:border-primary/30"
          >
            <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
              {t('home')}
            </span>
          </a>
          
          {[
            { 
              href: "https://twitter.com/OfficialGlobalBox", 
              icon: Twitter, 
              label: t('twitter'),
              color: "hover:text-blue-500"
            },
            { 
              href: "https://instagram.com/globalbox_world", 
              icon: Instagram, 
              label: t('instagram'),
              color: "hover:text-pink-500"
            },
            { 
              href: "https://linkedin.com/company/globalbox-world", 
              icon: Linkedin, 
              label: t('linkedin'),
              color: "hover:text-blue-600"
            },
            { 
              href: "https://facebook.com/OfficialGlobalBox", 
              icon: Facebook, 
              label: t('facebook'),
              color: "hover:text-blue-700"
            },
            { 
              href: "https://youtube.com/channel/UC-jROZQGqqDkqltU-qHeLmw", 
              icon: Youtube, 
              label: t('youtube'),
              color: "hover:text-red-500"
            }
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/50 via-white/30 to-white/50 rounded-2xl hover:from-primary/10 hover:to-accent/10 transition-all duration-300 border border-white/20 hover:border-primary/30 ${social.color}`}
            >
              <social.icon className="w-4 h-4 text-muted-foreground group-hover:scale-110 transition-all duration-300" />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {social.label}
              </span>
            </a>
          ))}
        </div>

        {/* Partners */}
        <div className="text-center mb-8">
          <h4 className="text-lg font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('trustedPartners')}
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              "FedEx", "PayTm", "MasterCard", "Visa", "Rugby Romania", "Global Chamber of Commerce & Industry"
            ].map((partner, index) => (
              <a 
                key={index}
                href="#" 
                className="group px-4 py-2 bg-gradient-to-r from-white/50 via-white/30 to-white/50 rounded-2xl hover:from-primary/10 hover:to-accent/10 transition-all duration-300 border border-white/20 hover:border-primary/30 hover:scale-105"
              >
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {partner}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 rounded-2xl px-6 py-3 backdrop-blur-sm border border-border/50">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground font-medium">{t('copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
