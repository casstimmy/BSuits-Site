import Hero from '@/components/home/Hero';
import FeaturesOverview from '@/components/home/FeaturesOverview';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesOverview />
      <Testimonials />
      <CTA />
    </>
  );
}
