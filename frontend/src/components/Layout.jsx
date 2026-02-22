
import { useSidebar } from '../context/SidebarContext';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const { isCollapsed } = useSidebar();

    return (
        <div className="flex bg-brand-dark min-h-screen text-gray-900 font-sans selection:bg-brand-yellow selection:text-white">
            <Sidebar />

            <div
                className={`flex-1 transition-all duration-300 p-8 ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}
            >
                {children}
            </div>
        </div>
    );
};

export default Layout;
