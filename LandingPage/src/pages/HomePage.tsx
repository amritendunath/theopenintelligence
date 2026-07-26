import Hero from '../components/Hero';
import Featured from '../components/Featured';
import CaseStudies from '../components/CaseStudies';
import LatestReleases from '../components/LatestReleases';
import NewsSection from '../components/NewsSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Featured />
      <CaseStudies />
      <LatestReleases />
      <NewsSection />
    </>
  );
}
