import { FC, ReactNode } from "react";
import Header from "./Header";

interface Props {
    children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <div className="flex flex-col justify-center min-h-screen">
                <Header />
                <div className="w-full flex-1 py-4">
                    {children}
                </div>
                {/* <Footer /> */}
            </div>
        </>
    );
};

export default Layout;
