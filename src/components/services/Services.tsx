'use client';

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import styles from './services.module.scss'
import general from '../../../public/general.jpg'
import education from '../../../public/hero.jpg'
import softSkills from '../../../public/computer.jpg'
import artisanalSkills from '../../../public/tailoring.jpg'
import { postponeWithTracking } from 'next/dist/server/app-render/dynamic-rendering';

interface GalleryProps {
  autoPlayInterval?: number
}

const Gallery = ({ autoPlayInterval = 20000 }: GalleryProps) => {
  const radius = 400
  const [isMobile, setIsMobile] = useState(false)
  const rotate = useMotionValue(0)
  const transform = useTransform(rotate, (value) => `rotateY(${value}deg)`)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  interface Slide {
    poster?: StaticImageData,
    service?: string,
    description?: string,
    image?: StaticImageData
  }

  const slides: Slide[] = [ 
    {
      poster: general,
    },
    {
      service: 'Education',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    Perferendis sunt voluptas ut mollitia vero eveniet nesciunt, 
                    sequi odio iusto quam esse tempore commodi eligendi soluta porro 
                    corrupti quo amet reprehenderit!
                   `,
      image: education
    },
    {
      service: 'Soft Skills',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    Perferendis sunt voluptas ut mollitia vero eveniet nesciunt, 
                    sequi odio iusto quam esse tempore commodi eligendi soluta porro 
                    corrupti quo amet reprehenderit!
                   `,
      image: softSkills
    },
    {
      service: 'Artisanal Skills',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    Perferendis sunt voluptas ut mollitia vero eveniet nesciunt, 
                    sequi odio iusto quam esse tempore commodi eligendi soluta porro 
                    corrupti quo amet reprehenderit!
                   `,
      image: artisanalSkills
    },
    {
      poster: general,
    },
    {
      service: 'Education',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    Perferendis sunt voluptas ut mollitia vero eveniet nesciunt, 
                    sequi odio iusto quam esse tempore commodi eligendi soluta porro 
                    corrupti quo amet reprehenderit!
                   `,
      image: education
    },
    {
      service: 'Soft Skills',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    Perferendis sunt voluptas ut mollitia vero eveniet nesciunt, 
                    sequi odio iusto quam esse tempore commodi eligendi soluta porro 
                    corrupti quo amet reprehenderit!
                   `,
      image: softSkills
    },
    {
      service: 'Artisanal Skills',
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    Perferendis sunt voluptas ut mollitia vero eveniet nesciunt, 
                    sequi odio iusto quam esse tempore commodi eligendi soluta porro 
                    corrupti quo amet reprehenderit!
                   `,
      image: artisanalSkills
    },
  ]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (autoPlayInterval > 0) {
      autoplayRef.current = setInterval(() => {
        rotate.set(rotate.get() - 45) // rotate 45° left
      }, autoPlayInterval)

      return () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current)
      }
    }
  }, [autoPlayInterval, rotate])

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    rotate.set(rotate.get() + info.delta.x * 0.5);
  }

  return (
    <section className={styles.section}>
        <h1>WHAT WE DO</h1>
        <article className={styles.galleryContainer}>
            <div className={`${styles.galleryGradient} ${styles.galleryGradientLeft}`}></div>
            <div className={`${styles.galleryGradient} ${styles.galleryGradientRight}`}></div>
            <div className={styles.galleryContent}>
                <motion.div
                    drag="x"
                    dragElastic={0.1}
                    onDrag={handleDrag}
                    className={styles.galleryTrack}
                    style={{
                        transformStyle: 'preserve-3d',
                        transform,
                        width: '300px',
                        height: '300px',
                        position: 'relative',
                    }}
                >
                    {slides.map((slide, index) => {
                        const angle = (360 / slides.length) * index;
                        const x = Math.sin((angle * Math.PI) / 180) * radius;
                        const z = Math.cos((angle * Math.PI) / 180) * radius;

                        return (
                            <motion.div
                                key={index}
                                style={{
                                    position: 'absolute',
                                    width: isMobile ? '200px' : '300px',
                                    height: isMobile ? '200px' : '300px',
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${angle}deg)`,
                                }}
                                className={styles.galleryItem}
                            >
                                {slide.poster &&
                                  <Image src={slide.poster} alt='poster' className={styles.poster} fill />
                                }
                                { !slide.poster && slide.service && slide.image &&
                                  <>
                                    <Image src={slide.image} alt={slide.service} className={styles.galleryImage}/>
                                    <h3>{slide.service}</h3>
                                    <p>{slide.description}</p>
                                  </>
                                }
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </article>
    </section>
  )
}

export default Gallery;
