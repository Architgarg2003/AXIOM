'use client';

import Image from 'next/image';
import Link from 'next/link';
import useAccordion from '@/components/hooks/useAccordian';
import useTabs from '@/components/hooks/useTabs';
import Header_01 from '@/components/header/Header_01';
import Footer_01 from '@/components/footer/Footer_01';
import TeamMemberCard from '@/components/profile';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import '@/styles/global.css'
import { useAuth } from '@clerk/clerk-react';
import { useReducer } from 'react';
import { useRouter } from 'next/navigation';

const DMSans = localFont({
  src: '../fonts/DMSans-Bold.woff2',
  variable: '--font-DMSans',
});

const ClashDisplay = localFont({
  src: '../fonts/ClashDisplay-Medium.woff2',
  variable: '--font-clash-display',
});

const Raleway = localFont({
  src: '../fonts/Raleway-Bold.woff2',
  variable: '--font-raleway',
});

const SpaceGrotesk = localFont({
  src: '../fonts/SpaceGrotesk-Bold.woff2',
  variable: '--font-space-grotesk',
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Define types for social links
interface SocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

// Define type for TeamMemberCard props
interface TeamMemberCardProps {
  name: string;
  role: string;
  imageSrc: string;
  socialLinks: SocialLinks;
}

function Home(): JSX.Element {

    const { userId } = useAuth();

    const router = useRouter();

    if(userId){
      router.push('/exploreTest')
    }

  return (
    <div className={`page-wrapper relative z-[1] bg-white ${DMSans.variable} ${ClashDisplay.variable} ${Raleway.variable} ${SpaceGrotesk.variable} ${inter.variable}`}>
      <Header_01 />
      <main className='main-wrapper relative overflow-hidden'>
        {/* Hero Section */}
        <section id='section-hero'>
          <div className='relative z-[1] overflow-hidden rounded-bl-[30px] rounded-br-[30px] bg-[#efeae3] pb-20 pt-28 lg:rounded-bl-[50px] lg:rounded-br-[50px] lg:pb-24 lg:pt-32 xl:pt-40 xxl:pb-[133px] xxl:pt-[195px]'>
            <div className='global-container'>
              <div className='mb-14 flex flex-col items-center text-center lg:mb-20'>
                <h1 className='jos slide-from-bottom mb-6 max-w-[510px] lg:max-w-[768px] xl:max-w-[1076px]'>
                  AI-Powered Job Prep Companion
                </h1>
                <p className='jos slide-from-bottom mb-11 max-w-[700px] text-lg font-semibold sm:text-xl xl:max-w-[980px]'>
                  Elevate Your Job Preparation with AI Transform your interview practice and skill assessments with Axiom's AI-driven platform. Get personalized tests and detailed feedback based on your resume and job description.
                </p>
                <div
                  className='jos flex flex-wrap justify-center gap-6'
                  data-jos_animation='fade'
                >
                  <Link
                    href='/sign-in'
                    className='button rounded-[50px] border-2 border-black bg-black py-4 text-white hover:border-[#f15bb5] hover:text-white'
                  >
                    Get started for free
                  </Link>
                </div>
              </div>
              <div
                className='jos hero-img overflow-hidden rounded-2xl bg-black'
                data-jos_animation='zoom'
              >
                <Image
                  src='/assets/img_placeholder/th-1/h3.png'
                  alt='hero-dashboard'
                  width={1296}
                  height={640}
                  className='h-auto w-full'
                />
              </div>
            </div>
            <div className='orange-gradient-1 absolute -right-[150px] top-[370px] -z-[1] h-[500px] w-[500px] animate-spin rounded-[500px]'></div>
            <div className='blue-gradient-2 absolute right-[57px] top-[620px] -z-[1] h-[450px] w-[450px] animate-spin rounded-[450px]'></div>
          </div>
        </section>

        {/* Feature Section */}
        <section id='Feature'>
          <div className='pb-20 pt-20 xl:pb-[150px] xl:pt-[130px]'>
            <div className='global-container'>
              <div className='jos mb-10 lg:mb-16 xl:mb-20'>
                <div className='md:max-w-sm lg:max-w-xl xl:max-w-[746px]'>
                  <h2>Core features that make it valuable</h2>
                </div>
              </div>
              <ul className='jos grid grid-cols-1 gap-[2px] overflow-hidden rounded-[10px] border-2 border-black bg-black sm:grid-cols-2 lg:grid-cols-4'>
                {/* Feature items */}
                <li className='group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-black'>
                  <div className='relative mb-9 h-[70px] w-[70px]'>
                    <Image
                      src='/assets/img_placeholder/th-1/service-icon-black-1.svg'
                      alt=''
                      width='70'
                      height='70'
                    />
                    <Image
                      src='/assets/img_placeholder/th-1/service-icon-orange-1.svg'
                      alt='service-icon-orange-1'
                      width='70'
                      height='70'
                      className='absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100'
                    />
                  </div>
                  <h3 className='mb-4 block text-xl leading-tight -tracking-[0.5px] hover:text-[#AE67FBFF] group-hover:text-white xl:text-2xl xxl:text-[28px]'>
                    <span className='hover:text-[#AE67FBFF]'>
                      Tailored Assessments
                    </span>
                  </h3>

                  <p className='mb-12 duration-300 group-hover:text-white'>
                    Our platform adapts to your job profile, creating unique test questions designed to mirror real interview scenarios.
                  </p>

                </li>
                {/* Service Item */}
                {/* Service Item */}
                <li className='group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-black'>
                  <div className='relative mb-9 h-[70px] w-[70px]'>
                    <Image
                      src='/assets/img_placeholder/th-1/service-icon-black-2.svg'
                      alt='service-icon-black-2'
                      width='70'
                      height='70'
                    />
                    <Image
                      src='/assets/img_placeholder/th-1/service-icon-orange-2.svg'
                      alt='service-icon-orange-1'
                      width='70'
                      height='70'
                      className='absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100'
                    />
                  </div>

                  <h3 className='mb-4 block text-xl leading-tight -tracking-[0.5px] group-hover:text-white xl:text-2xl xxl:text-[28px]'>
                    <span className='hover:text-[#AE67FBFF]'>
                      Proctored Interview Environment
                    </span>
                  </h3>

                  <p className='mb-12 duration-300 group-hover:text-white'>
                    Prepare in a real-world setting with our proctored environment, where you can simulate interviews with camera access and real-time monitoring.
                  </p>
                </li>
                <li className='group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-black'>
                  <div className='relative mb-9 h-[70px] w-[70px]'>
                    <Image
                      src='/assets/img_placeholder/th-1/service-icon-black-3.svg'
                      alt='service-icon-black-3'
                      width='70'
                      height='70'
                    />
                    <Image
                      src='/assets/img_placeholder/th-1/service-icon-orange-3.svg'
                      alt='service-icon-orange-3'
                      width='70'
                      height='70'
                      className='absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100'
                    />
                  </div>
                  <h3 className='mb-4 block text-xl leading-tight -tracking-[0.5px] group-hover:text-white xl:text-2xl xxl:text-[28px]'>
                    <span className='hover:text-[#AE67FBFF]'>
                      Interactive Dashboard
                    </span>
                  </h3>

                  <p className='mb-12 duration-300 group-hover:text-white'>
                    Track your progress with a detailed streak map, global rankings, and a leaderboard that highlights top performers based on test accuracy.
                  </p>
                </li>
                {/* Service Item */}
                {/* Service Item */}
                <li className='group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-black'>
                  <div className='relative mb-9 h-[70px] w-[70px]'>
                    <Image
                      src='/assets/img_placeholder/th-1/service-icon-black-4.svg'
                      alt='service-icon-black-4'
                      width='70'
                      height='70'
                    />
                    <Image
                      src='/assets/img_placeholder/th-1/service-icon-orange-4.svg'
                      alt='service-icon-orange-4'
                      width='70'
                      height='70'
                      className='absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100'
                    />
                  </div>
                  <h3 className='mb-4 block text-xl leading-tight -tracking-[0.5px] group-hover:text-white xl:text-2xl xxl:text-[28px]'>
                    <span className='hover:text-[#AE67FBFF]'>
                      Dinosaur Meeting Ground
                    </span>
                  </h3>

                  <p className='mb-12 duration-300 group-hover:text-white'>
                    Enter our virtual world where you can connect with other users through chat and voice with spatial audio. Collaborate and network in real-time.
                  </p>
                </li>
                {/* Service Item */}
                {/* ... (Feature items remain the same) */}
              </ul>
            </div>
          </div>
        </section>

        {/* Funfact Section */}
        <section id='funfact-section'>
          <div className='mx-auto pb-20 max-w-[1500px] px-5'>
            <div className='jos grid grid-cols-1 overflow-hidden rounded-[30px] bg-black lg:rounded-[50px] xl:grid-cols-[minmax(400px,_1fr)_1.5fr] xxl:grid-cols-[1fr_minmax(800px,_1fr)]'>
              <div className='relative overflow-hidden rounded-[30px] lg:rounded-[50px]'>
                <Image
                  src='/assets/img_placeholder/th-1/an2.png'
                  alt='funfact-image'
                  width='721'
                  height='784'
                  className='h-80 w-full object-cover object-center lg:h-[35rem] xl:h-full'
                />
                <Link
                  data-fslightbox='gallery'
                  rel='noopener noreferrer'
                  href='https://www.youtube.com/watch?v=0EqWovxYehY'
                  className='absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2'
                >
                  <div className='relative flex h-[120px] w-[120px] items-center justify-center text-white rounded-full border-[3px] border-gray-100 text-lg font-bold backdrop-blur-[2px] transition-all duration-300 hover:bg-[#AE67FBFF] hover:text-white'>
                    Play
                    <div className='absolute -z-[1] h-[110%] w-[110%] animate-[ping_1.5s_ease-in-out_infinite] rounded-full bg-gray-600 opacity-30'></div>
                  </div>
                </Link>
              </div>
              <div className='self-center px-6 py-16 sm:py-20 md:px-16 xl:px-10 xl:py-24 xxl:py-32 xxl:pl-16 xxl:pr-28'>
                <div className='mb-8 lg:mb-16 xl:mb-6'>
                  <h2 className='text-white'>
                    AI-Powered Solutions That Simplify Your Job Prep
                  </h2>
                </div>
                <div className='text-left text-lg leading-[1.4] text-white lg:text-[21px]'>
                  <p className='mb-7 last:mb-0'>
                    Axiom’s platform grows with you. As your career progresses or your job requirements evolve, our AI adapts to deliver more relevant tests and interview experiences. This flexibility ensures your preparation stays effective and aligned with your goals.
                  </p>
                </div>
                <div className='my-14 h-[1px] w-full bg-colorCodGray'></div>
                <ul className='flex flex-col justify-center gap-x-11 gap-y-8 text-center sm:flex-row md:text-left xl:justify-normal xl:text-left xxl:gap-x-20'>
                  <li>
                    <h3
                      className='text-5xl text-[#AE67FBFF] md:text-6xl lg:text-7xl xl:text-7xl xxl:text-[120px]'
                      data-module='countup'
                    >
                      <span className='start-number' data-countup-number='92'>
                        92
                      </span>
                      %
                    </h3>
                    <span className='block text-lg font-normal text-white lg:text-[21px]'>
                      Success rate in improving candidate readiness
                    </span>
                  </li>
                  <li>
                    <h3
                      className='text-5xl text-[#AE67FBFF] md:text-6xl lg:text-7xl xl:text-7xl xxl:text-[120px]'
                      data-module='countup'
                    >
                      <span className='start-number' data-countup-number='75'>
                        75
                      </span>
                      %
                    </h3>
                    <span className='block text-lg font-normal text-white lg:text-[21px]'>
                      More confidence in interviews and assessments
                    </span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id='Services'>
          <div className='pb-20 xl:pb-[150px]'>
            <div className='global-container'>
              <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:gap-28 xxl:gap-32'>
                <div
                  className='jos order-2 overflow-hidden rounded-md md:order-1'
                  data-jos_animation='fade-left'
                >
                  <Image
                    src='/assets/img_placeholder/th-1/lb.png'
                    alt='content-image-1'
                    width='526'
                    height='450'
                    className='h-auto w-full'
                  />
                </div>
                <div
                  className='jos order-1 md:order-2'
                  data-jos_animation='fade-right'
                >
                  <div className='mb-6'>
                    <h2>Bringing AI-Driven Insights to Everyone</h2>
                  </div>
                  <div className='text-lg leading-[1.4] lg:text-[21px]'>
                    <p className='mb-7 last:mb-0'>
                      Axiom makes advanced AI-powered job preparation accessible to everyone—whether you are an undergraduate, a fresher, or part of a small to medium-sized business. No need for specialized resources or expertise.
                    </p>
                    <p className='mb-7 last:mb-0'>
                      Axiom provides personalized assessments and skill development to anyone looking to advance their career.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section 2 */}
        <section id='content-section-2'>
          <div className='pb-20 xl:pb-[150px]'>
            <div className='global-container'>
              <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:grid-cols-[minmax(0,_1.2fr)_1fr] xl:gap-28 xxl:gap-32'>
                <div
                  className='jos order-2 overflow-hidden rounded-md'
                  data-jos_animation='fade-left'
                >
                  <Image
                    src='/assets/img_placeholder/th-1/lb3.png'
                    alt='content-image-2'
                    width='526'
                    height='450'
                    className='h-auto w-full'
                  />
                </div>
                <div className='jos order-1' data-jos_animation='fade-right'>
                  <div className='mb-6'>
                    <h2>Instant Access to Job Preparation Tools</h2>
                  </div>
                  <div className='text-lg leading-[1.4] lg:text-[21px]'>
                    <p className='mb-7 last:mb-0'>
                      Axiom’s solutions are designed for fast implementation, allowing users to immediately start benefiting from AI-powered tests without long setup times. Our ready-to-use system delivers a seamless experience so you can focus on honing your skills and preparing for interviews.
                    </p>
                    <ul className='flex flex-col gap-y-5 font-dmSans text-xl leading-tight tracking-tighter text-black lg:mt-12 lg:text-[28px]'>
                      <li className='flex items-start gap-x-3'>
                        <div className='mt-[2.5px] h-[30px] w-[30px]'>
                          <Image
                            src='/assets/img_placeholder/th-1/check-circle.svg'
                            alt='check-circle'
                            width='30'
                            height='30'
                            className='h-full w-full'
                          />
                        </div>
                        Ready-to-use AI tools
                      </li>
                      <li className='flex items-start gap-x-3'>
                        <div className='mt-[2.5px] h-[30px] w-[30px]'>
                          <Image
                            src='/assets/img_placeholder/th-1/check-circle.svg'
                            alt='check-circle'
                            width='30'
                            height='30'
                            className='h-full w-full'
                          />
                        </div>
                        Easy integration for personalized testing
                      </li>
                      <li className='flex items-start gap-x-3'>
                        <div className='mt-[2.5px] h-[30px] w-[30px]'>
                          <Image
                            src='/assets/img_placeholder/th-1/check-circle.svg'
                            alt='check-circle'
                            width='30'
                            height='30'
                            className='h-full w-full'
                          />
                        </div>
                        Time-efficient assessments that save you both effort and cost
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className='testimonial-section' id='Ourteam'>
          <div className='bg-black pb-40 pt-20 xl:pb-[200px] xl:pt-[130px]'>
            <div className='global-container'>
              <div className='jos mb-10 text-center lg:mb-16 xl:mb-20'>
                <div className='mx-auto max-w-[300px] lg:max-w-[600px] xl:max-w-[680px]'>
                  <h2 className='text-white'>Our Team</h2>
                </div>
              </div>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                <TeamMemberCard
                  name="Adarsh Kumar"
                  role="Full Stack Dev"
                  imageSrc="/assets/img_placeholder/th-1/Adarsh2.png"
                  socialLinks={{
                    github: 'https://github.com/AdarshGzz',
                    twitter: 'https://x.com/AdarshK51986157',
                    linkedin: 'https://www.linkedin.com/in/adarsh-kumar-gupta-a96b54228/',
                    instagram: 'https://www.instagram.com/adarshgzz?igsh=NTlic3UybGJja2Rl'
                  }}
                />
                <TeamMemberCard
                  name="Archit Garg"
                  role="Full Stack Dev"
                  imageSrc="/assets/img_placeholder/th-1/A3.png"
                  socialLinks={{
                    github: 'https://github.com/Architgarg2003',
                    twitter: 'https://x.com/archit_garg2003',
                    linkedin: 'https://www.linkedin.com/in/architgarg2003/',
                    instagram: 'https://www.instagram.com/archit2003/'
                  }}
                />
                <TeamMemberCard
                  name="Ayush Dhiman"
                  role="Dev Ops Engineer"
                  imageSrc="/assets/img_placeholder/th-1/Ayus.jpeg"
                  socialLinks={{
                    github: 'https://github.com/AyushDhimann',
                    twitter: 'https://twitter.com/AyushDhimann',
                    linkedin: 'https://www.linkedin.com/in/ayushdhimann/',
                    instagram: 'https://www.instagram.com/ayush.__.dhiman/'
                  }}
                />
                <TeamMemberCard
                  name="Mudit Gaur"
                  role="ML Engineer"
                  imageSrc="/assets/img_placeholder/th-1/M4.png"
                  socialLinks={{
                    github: 'https://github.com/muditgaur-1009',
                    twitter: 'https://x.com/gaurmudit123432',
                    linkedin: 'https://www.linkedin.com/in/mudit-gaur-601757189/',
                    instagram: 'https://www.instagram.com/gaur__mudit/'
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        <div className='orange-gradient-1 absolute -left-[15px] top-[71%] -z-[1] h-[400px] w-[400px] -rotate-[-9.022deg] rounded-[400px]'></div>
        <div className='orange-gradient-2 absolute -left-[100px] top-[74%] -z-[1] h-[360px] w-[360px] -rotate-[-9.022deg] rounded-[360px]'></div>
      </main>
      <Footer_01 />
    </div>
  );
}

export default Home;