import { useRouter } from 'next/router';
import AdPromotionSection from "./AdPromotionSection";
import Footer2 from "./Footer2";
import Header3 from "./Header3";
import Header4 from './Header4';
import MyAccount from '@/pages/account/MyAccount';
import ThreeLayer from '../additional/ThreeLayer';

const Layout = ({ children }) => {
    const router = useRouter();
    const { pathname } = router;

    // Conditionally render MyAccount component based on the route
    const renderContent = () => {
        if (pathname === '/account/MyAccount') {
            return <MyAccount />;
        } else if (pathname === '/all-categories/bedding/bed-sheet/king') {
            return (
                <>
                    {/* <AdPromotionSection /> */}
                    {/* <ThreeLayer/> */}
                    <Header4 key="header" />
                    <main className="p-4">{children}</main>
                    <Footer2 key="footer" />
                </>
            );
        } else {
            return (
                <>
                    {/* <AdPromotionSection /> */}
                    {/* <ThreeLayer/>
                    <Header3 key="header" /> */}
                    <main className="">{children}</main>
                    {/* <Footer2 key="footer" /> */}
                </>
            );
        }
    };

    return (
        <div className="app__wrapper min-h-screen">
            
            {renderContent()}
        </div>
    );
}

export default Layout;
