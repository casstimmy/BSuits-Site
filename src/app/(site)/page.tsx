import Hero from '@/components/home/Hero';
import FeaturesOverview from '@/components/home/FeaturesOverview';
import BuildPortfolio from '@/components/home/BuildPortfolio';
import CTA from '@/components/home/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesOverview />
      <BuildPortfolio />
      <CTA />
    </>
  );
}
