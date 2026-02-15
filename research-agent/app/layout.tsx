import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, Manrope } from 'next/font/google';
import './globals.css';

// Clean, modern fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
});

// Fix: Viewport should be separate export
export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Fix: Added metadataBase for proper image URLs
export const metadata: Metadata = {
  metadataBase: new URL('https://research-assistant-ai.vercel.app'),
  title: {
    default: 'Research Assistant AI | Intelligent Document & Web Search',
    template: '%s | Research Assistant AI'
  },
  description: 'A production-ready AI application demonstrating RAG, agentic workflows, and intelligent search. Perfect for showcasing AI engineering skills.',
  keywords: ['AI Agent', 'RAG', 'Vercel AI SDK', 'Next.js', 'TypeScript', 'Portfolio Project', 'AI Engineering'],
  authors: [{ name: 'Research Assistant AI Project' }],
  creator: 'Next.js + Vercel AI SDK',
  publisher: 'Vercel',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://research-assistant-ai.vercel.app',
    title: 'Research Assistant AI | Portfolio Showcase',
    description: 'Production-ready AI application demonstrating RAG, agentic workflows, and intelligent search',
    siteName: 'Research Assistant AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Research Assistant AI - Intelligent AI Agent Interface',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research Assistant AI',
    description: 'AI-powered research assistant with document and web search',
    images: ['/og-image.png'],
    creator: '@vercel',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} ${manrope.variable}`}>
      <head>
        {/* Preconnect to fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Apple specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Research AI" />
        
        {/* Windows specific */}
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Additional meta tags */}
        <meta name="application-name" content="Research Assistant AI" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Clean, simple styles without SSR conflicts */}
        <style>{`
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 10px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 5px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, #ff6b35, #9d4edd, #00f5d4);
            border-radius: 5px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(45deg, #ff5500, #8a2be2, #00e6c3);
          }
          
          /* Selection styling */
          ::selection {
            background: linear-gradient(45deg, 
              rgba(255, 107, 53, 0.8), 
              rgba(157, 78, 221, 0.8), 
              rgba(0, 245, 212, 0.8)
            );
            color: white;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
          }
          
          /* Focus styles */
          :focus-visible {
            outline: 2px solid #ff6b35;
            outline-offset: 2px;
            border-radius: 4px;
          }
          
          /* Gradient text utility */
          .text-gradient {
            background: linear-gradient(45deg, #ff6b35, #ff9e00, #9d4edd, #00f5d4);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            background-size: 200% 200%;
            animation: gradientShift 6s ease infinite;
          }
          
          @keyframes gradientShift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          
          /* Pulse animation */
          @keyframes pulse-glow {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.05);
            }
          }
          
          /* Floating animation */
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }
          
          /* Page load animation */
          @keyframes pageLoad {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .page-load {
            animation: pageLoad 0.6s ease-out;
          }
        `}</style>
      </head>
      <body className={`
        ${inter.className}
        bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50
        dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        text-gray-900 dark:text-gray-100
        min-h-screen
        antialiased
        transition-colors duration-300
      `}>
        {/* Background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Gradient circles - Using new orange/purple/teal colors */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-orange-200/20 to-purple-200/20 rounded-full blur-3xl dark:from-orange-900/10 dark:to-purple-900/10" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-teal-200/20 to-orange-200/20 rounded-full blur-3xl dark:from-teal-900/10 dark:to-orange-900/10" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>
          
          {/* Floating shapes with new colors */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full animate-float`}
              style={{
                width: `${Math.random() * 80 + 20}px`,
                height: `${Math.random() * 80 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, 
                  rgba(255, ${Math.random() * 100 + 107}, ${Math.random() * 100 + 53}, 0.1) 0%,
                  transparent 70%
                )`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${Math.random() * 8 + 12}s`,
              }}
            />
          ))}
        </div>
        
        {/* Main content */}
        <div className="relative z-10 page-load">
          {children}
        </div>
        
        {/* Simple loading script - no SSR conflicts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Add loaded class when page loads
              window.addEventListener('load', function() {
                document.body.classList.add('loaded');
                console.log('🚀 Research Assistant AI loaded successfully');
                
                // Simple animation for elements on scroll
                const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      entry.target.classList.add('animate-fade-in');
                    }
                  });
                }, {
                  threshold: 0.1
                });
                
                // Observe all sections
                document.querySelectorAll('section, .animate-on-scroll').forEach(el => {
                  observer.observe(el);
                });
              });
              
              // Add fade-in animation style
              const style = document.createElement('style');
              style.textContent = \`
                @keyframes fade-in {
                  from {
                    opacity: 0;
                    transform: translateY(20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                .animate-fade-in {
                  animation: fade-in 0.6s ease-out forwards;
                }
                
                /* Add smooth hover effects */
                .hover-lift {
                  transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .hover-lift:hover {
                  transform: translateY(-4px);
                  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
                              0 10px 10px -5px rgba(0, 0, 0, 0.04);
                }
              \`;
              document.head.appendChild(style);
              
              // Add hover-lift class to cards
              document.querySelectorAll('.card, .feature-card, .tech-badge').forEach(el => {
                el.classList.add('hover-lift');
              });
            `
          }}
        />
      </body>
    </html>
  );
}