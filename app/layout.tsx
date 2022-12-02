import '../styles/output.css';
import Header from '../components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
