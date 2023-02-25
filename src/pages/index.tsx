import Head from 'next/head';
import Image from 'next/image';
import { Hero, PageHead } from '@/components';
import { motion } from "framer-motion";


export default function LandingPage() {
  return (
    <>
      <PageHead title="ADUN Social" page_name={''} />
      <main className="px-5 md:lg:px-32 bg-gradient-to-b light-gradient dark:dark-gradient">
        {/* Hero */}
        <Hero />
      </main>
    </>
  );
}
