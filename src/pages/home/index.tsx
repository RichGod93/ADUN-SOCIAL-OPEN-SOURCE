import type { ReactElement } from 'react';
import { Layout } from '@/components';
import type { NextPageWithLayout } from '../../pages/_app';
import { appwrite } from 'config/appwriteConfig';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


const HomePage: NextPageWithLayout = () => {
    const router = useRouter();

    const verifyUser = (userId: string, secret: string) => {
        appwrite.account.updateVerification(userId, secret)
            .then(() => {
                alert('User is verified');
                router.push('../home');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');
        const secret = urlParams.get('secret');

        if (userId && secret) {
            verifyUser(userId, secret);
        } else {
            console.log("User ID or secret missing");
        }
    }, []);

    return (
        <div>

        </div>
    );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
    return (<Layout>{page}</Layout>);
};

export default HomePage;