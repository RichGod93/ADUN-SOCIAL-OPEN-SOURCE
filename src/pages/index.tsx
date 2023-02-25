import Head from 'next/head';
import Image from 'next/image';
import { Hero, PageHead } from '@/components';
import { motion } from "framer-motion";


export default function LandingPage() {
  return (
    <>
      <PageHead title="ADUN Social" page_name={''} />
      <main className="lg:px-32 bg-gradient-to-b from-transparent via-transparent to-[#526CFF]">
        {/* Hero */}
        <Hero />
      </main>
    </>
  );
}
