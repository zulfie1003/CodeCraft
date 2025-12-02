import React from 'react';
import { Link } from 'wouter';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Security', href: '#security' },
      { label: 'Roadmap', href: '#roadmap' },
    ],
    Learning: [
      { label: 'DSA Problems', href: '/practice' },
      { label: 'Courses', href: '/roadmap' },
      { label: 'AI Mentor', href: '/mentor' },
      { label: 'Hackathons', href: '/hackathons' },
    ],
    Community: [
      { label: 'Discord', href: '#discord' },
      { label: 'Forums', href: '#forums' },
      { label: 'Blog', href: '#blog' },
      { label: 'Events', href: '#events' },
    ],
    Company: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' },
      { label: 'Privacy', href: '#privacy' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@codecraft.dev', label: 'Email' },
  ];

  return (
    <footer className="bg-background border-t border-white/10">
      {/* About Us Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary" />
              <h2 className="text-2xl font-bold">
                Code<span className="text-neon-cyan">Craft</span>
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              CodeCraft is an AI-powered learning platform designed to help developers master coding, solve data structures and algorithms, build real-world projects, and land their dream jobs at top tech companies.
            </p>
            <p className="text-sm text-muted-foreground">
              With our comprehensive curriculum, AI mentor, and job marketplace, we're transforming how developers learn and grow.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Why Choose CodeCraft?</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">→</span>
                <span><strong>AI-Powered Learning:</strong> Personalized curriculum adapted to your pace</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">→</span>
                <span><strong>Real Interview Prep:</strong> Practice with actual company questions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink-500 mt-1">→</span>
                <span><strong>Job Marketplace:</strong> Direct connection with top tech companies</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">→</span>
                <span><strong>Community Support:</strong> Learn from and help fellow developers</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-16 border-b border-white/10">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-foreground mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-2">
              Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> by the CodeCraft Team
            </p>
            <p className="text-xs text-muted-foreground/50 mt-2">
              © {currentYear} CodeCraft. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:shadow-[0_0_15px_rgba(0,243,255,0.1)]"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
