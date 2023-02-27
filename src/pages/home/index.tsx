import type { ReactElement } from 'react';
import { Layout } from '@/components';
import type { NextPageWithLayout } from '../../pages/_app';
import { appwrite } from 'config/appwriteConfig';
import { useRouter } from 'next/router';


const HomePage: NextPageWithLayout = () => {
    const router = useRouter();

    return (
        <div>

        </div>
    );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
    return (<Layout>{page}</Layout>);
};

export default HomePage;