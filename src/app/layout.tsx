import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <div className="wrapper">
            <Header />
            <main className="main-content">{children}</main>
            <Footer />
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}