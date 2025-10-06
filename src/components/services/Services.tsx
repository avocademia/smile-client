'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import styles from './services.module.scss';
import farming from '../../../public/farming.jpg'
import general from '../../../public/general.jpg';
import education from '../../../public/hero.jpg';
import softSkills from '../../../public/computer.jpg';
import artisanalSkills from '../../../public/tailoring.jpg';

interface GalleryProps {
  autoPlayInterval?: number;
}

const Gallery = ({ autoPlayInterval = 20000 }: GalleryProps) => {
  const [radius, setRadius] = useState(400);
  const [isMobile, setIsMobile] = useState(false);
  const rotate = useMotionValue(0);
  const transform = useTransform(rotate, (value) => `rotateY(${value}deg)`);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  interface Slide {
    poster?: StaticImageData;
    service?: string;
    description?: string;
    image?: StaticImageData;
  }

  const slides: Slide[] = [
    { poster: general },
    {
      service: 'Education',
      description: `Education is a fundamental right of every child, 
        and at SMILE Project we strive to provide quality 
        education to underprivileged children in our society.`,
      image: education,
    },
    {
      service: 'Accommodation',
      description: `We provide accommodation to children who lack
        a stable and safe living environment, nutritious food, 
        and a nurturing home.`,
      image: education,
    },
    {
      service: 'Artisanal Skills',
      description: `We equip children with practical artisan skills 
        such as tailoring, crocheting, soap and candle making.`,
      image: artisanalSkills,
    },
    {
      service: 'Soft Skills',
      description: `We also develop communication, teamwork, and time 
        management through workshops and activities.`,
      image: softSkills,
    },
    {poster: farming}
  ];

  // ✅ Responsive radius for landscape/mobile
  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w < 600) setRadius(180);
      else if (w < 1024 || h < 600) setRadius(260);
      else setRadius(400);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ✅ Autoplay rotation
  useEffect(() => {
    if (autoPlayInterval > 0) {
      autoplayRef.current = setInterval(() => {
        rotate.set(rotate.get() - 45);
      }, autoPlayInterval);

      return () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
      };
    }
  }, [autoPlayInterval, rotate]);

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    rotate.set(rotate.get() + info.delta.x * 0.5);
  };

  return (
    <section className={styles.section}>
      <h1>WHAT WE DO</h1>
      <article className={styles.galleryContainer}>
        <div className={`${styles.galleryGradient} ${styles.galleryGradientLeft}`} />
        <div className={`${styles.galleryGradient} ${styles.galleryGradientRight}`} />
        <div className={styles.galleryContent}>
          <motion.div
            drag="x"
            dragElastic={0.1}
            onDrag={handleDrag}
            className={styles.galleryTrack}
            style={{
              transformStyle: 'preserve-3d',
              transform,
            }}
          >
            {slides.map((slide, index) => {
              const angle = (360 / slides.length) * index;
              const x = Math.sin((angle * Math.PI) / 180) * radius;
              const z = Math.cos((angle * Math.PI) / 180) * radius;

              return (
                <motion.div
                  key={index}
                  className={styles.galleryItem}
                  style={{
                    transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${angle}deg)`,
                    left: '50%',
                    top: '50%',
                  }}
                >
                  {slide.poster ? (
                    <div className={styles.imageCont}>
                      <img
                        src={
                          typeof slide.poster === 'string'
                            ? slide.poster
                            : (slide.poster as StaticImageData).src
                        }
                        alt="poster"
                        className={styles.posterNative}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    slide.service && (
                      <>
                        <Image
                          src={slide.image!}
                          alt={slide.service}
                          width={100}
                          height={100}
                          className={styles.galleryImage}
                        />
                        <h3>{slide.service}</h3>
                        <p>{slide.description}</p>
                      </>
                    )
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </article>
    </section>
  );
};

export default Gallery;
