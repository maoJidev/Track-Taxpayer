import Topbar from "../features/main/components/Topbar";
import Sidebar from "../features/main/components/Sidebar";

const MainLayout = ({ children }) => {
    return (
        <div>
            <Topbar />

            <div className="d-flex">
                <Sidebar />

                <main className="flex-grow-1 p-4" style={{ backgroundColor: 'var(--bg-color)', minHeight: 'calc(100vh - 60px)' }}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
