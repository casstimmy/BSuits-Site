import Hero from '@/components/home/Hero';
import BrandPillars from '@/components/home/BrandPillars';
import FeaturesOverview from '@/components/home/FeaturesOverview';
import BuildPortfolio from '@/components/home/BuildPortfolio';
import CTA from '@/components/home/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandPillars />
      <FeaturesOverview />
      <BuildPortfolio />
      <CTA />
    </>
  );
}
