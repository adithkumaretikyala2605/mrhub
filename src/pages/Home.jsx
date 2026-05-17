import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';
import Process from '../components/Process';
import FeaturedStartups from '../components/FeaturedStartups';
import Testimonials from '../components/Testimonials';
import BoardOfMembers from '../components/BoardOfMembers';
import LatestNews from '../components/LatestNews';
import FAQ from '../components/FAQ';
import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Process />
      <FeaturedStartups />
      <Testimonials />
      <BoardOfMembers />
      <LatestNews />
      <FAQ />
      <CallToAction />
    </>
  );
};

export default Home;
