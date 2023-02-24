import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { PageHead } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export default function LandingPage() {
  return (
    <>
      <PageHead title="ADUN Social" page_name={''} />
      <main className='container h-screen w-screen flex items-center justify-center'>
        <div className=''><p className='font-bold'>Hello ADUN</p></div>
      </main>
    </>
  );
}
