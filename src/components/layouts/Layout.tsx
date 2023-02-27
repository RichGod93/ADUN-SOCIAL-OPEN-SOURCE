import NavBar from "./NavBar";

type DefaultLayoutProps = {
    children: React.ReactNode,
};

const Layout = ({ children }: DefaultLayoutProps) => {
    return (
        <div className="h-screen px-5 md:lg:px-10 flex flex-col bg-gradient-to-b light-gradient dark:dark-gradient">
            <NavBar />
            <div>{children}</div>
        </div>
    );
};

export default Layout;