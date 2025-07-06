import "@/assets/styles/globals.css";

export const metadata = {
    title: "Property Pulse",
    keywords: "rental, real-estate",
};

const MainLayout = ({ children }) => {
    return (
        <html lang={"en-US"}>
            <body>
                <main>{children}</main>
            </body>
        </html>
    );
};

export default MainLayout;
