import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({ 
  subsets: ["latin"],
  weight: ["400", "600"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "League Web UI",
  description: "Sports League Web Application",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <div className="app">
          <header style={{
            backgroundColor: '#025FEB',
            padding: '0',
            borderBottom: '1px solid #0247C7'
          }}>
            <div style={{
              maxWidth: '100%',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '60px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7.5C13.1 8.4 12.2 9 11.2 9H7.8C7 9 6.3 8.4 6.1 7.6L5 4L3 7V9H21ZM12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="#025FEB"/>
                  </svg>
                </div>
                <span style={{
                  color: '#FFFFFF',
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '16px',
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}>
                  League Web UI
                </span>
              </div>
              
              <nav style={{
                display: 'flex',
                gap: '0'
              }}>
                <a 
                  href="/" 
                  style={{
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontFamily: 'Open Sans, sans-serif',
                    fontSize: '14px',
                    fontWeight: '400',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    margin: '0 4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H9V12H7V10ZM11 10H13V12H11V10ZM15 10H17V12H15V10Z" fill="currentColor"/>
                  </svg>
                  Schedule
                </a>
                <a 
                  href="/leaderboard"
                  style={{
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontFamily: 'Open Sans, sans-serif',
                    fontSize: '14px',
                    fontWeight: '400',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    margin: '0 4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 4V2C7 1.45 7.45 1 8 1S9 1.45 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.45 17 2V4H20C21.1 4 22 4.9 22 6V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V6C2 4.9 2.9 4 4 4H7ZM4 8V20H20V8H4ZM12 17L8 13L9.41 11.59L12 14.17L14.59 11.59L16 13L12 17Z" fill="currentColor"/>
                  </svg>
                  Leaderboard
                </a>
              </nav>
            </div>
          </header>
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
