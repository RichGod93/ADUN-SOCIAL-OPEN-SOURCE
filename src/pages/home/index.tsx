import type { ReactElement } from 'react';
import { CreatePost, Layout } from '@/components';
import type { NextPageWithLayout } from '../../pages/_app';
import { appwrite } from 'config/appwriteConfig';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HomePage: NextPageWithLayout = () => {
    const router = useRouter();

    const verifyUser = (userId: string, secret: string) => {
        appwrite.account.updateVerification(userId, secret)
            .then(() => {
                toast.success('Account verified');
                router.push('../home');
            })
            .catch((error: any) => {
                toast.error(`${error.message}`);
                console.log(error);
            });
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');
        const secret = urlParams.get('secret');

        if (userId && secret) {
            verifyUser(userId, secret);
        }
    }, []);

    async function getStatus() {
        const data = await appwrite.account.get();

        if (data.status == true) {
            console.log('true');
        } else {
            console.log('false');
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="mt-3"><CreatePost /></div>

        </div>
    );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
    return (<Layout>{page}</Layout>);
};

export default HomePage;