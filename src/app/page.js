import Banner from '@/components/home/Banner';
import ExploreRooms from '@/components/home/ExploreRooms';
import HowItWorks from '@/components/home/HowItWorks';
import WhyStudyNook from '@/components/home/WhyStudyNook';
import React from 'react';

const Home = () => {
  return (
    <>
      <Banner />
      <ExploreRooms />
      <WhyStudyNook />
      <HowItWorks />
    </>
  );
};

export default Home;