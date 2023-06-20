import { Hero, PageHead } from '@/components';


export default function LandingPage() {
  return (
    <>
      <PageHead title="ADUN Social" page_name={''} />
      <main className="bg-gradient-to-b light-gradient dark:dark-gradient">
        {/* Hero */}
        <Hero />
      </main>
    </>
  );
}
