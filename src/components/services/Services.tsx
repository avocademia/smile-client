'use client';

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import styles from './services.module.scss'
import general from '../../../public/general.jpg'
import education from '../../../public/hero.jpg'
import softSkills from '../../../public/computer.jpg'
import artisanalSkills from '../../../public/tailoring.jpg'

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
      description: `Education is a fundamental right of every child, 
                    and at SMILE Project we strive to provide quality 
                    education to the underprivileged children in our society. 
                    We believe that Every Child Is A Blessing and  our 
                    goal is to empower these children with the knowledge and 
                    skills that will help them break the cycle of poverty and 
                    become self-reliant individuals. 
                   `,
      image: education
    },
    {
      service: 'Accomodation',
      description: `At our NGO, 
                    we understand that education alone is not enough to ensure a 
                    child's overall development. Hence, we also provide 
                    accommodation to a select few children who lack a 
                    stable and safe living environment, nutritious food, and a nurturing 
                    environment that they can call home. 
                    `,
      image: education
    },
    {
      service: 'Artisnal Skills',
      description: `We strongly believe in equipping the children with 
                    practical skills that will enable them to be 
                    self-sufficient and contribute to the growth of 
                    their communities. As part of our services, we offer 
                    artisan skills training to our older children, where 
                    they can learn various trades such as tailoring, 
                    crocheting, soap and candle making among others. 
                    These skills not only provide them with a means to earn 
                    a living but also instill a sense of pride and ownership in 
                    their work.
                   `,
      image: softSkills
    },
    {
      service: 'Soft Skills',
      description: `we also prioritize the development of soft skills 
                    in our children. We understand that these skills, 
                    such as communication, teamwork, and time management,
                    are essential for their personal and professional growth. 
                    Through various workshops and activities, we help our children 
                    develop these skills, which will serve them well in all aspects 
                    of their lives.In conclusion, our NGO's services go beyond 
                    just providing education. We believe in creating a nurturing 
                    and supportive environment for the children under our care, 
                    where they can grow into responsible and empowered individuals.
                   `,
      image: artisanalSkills
    },
    {
      poster: general,
    },
    {
      service: 'Education',
      description: `Education is a fundamental right of every child, 
                    and at SMILE Project we strive to provide quality 
                    education to the underprivileged children in our society. 
                    We believe that Every Child Is A Blessing and  our 
                    goal is to empower these children with the knowledge and 
                    skills that will help them break the cycle of poverty and 
                    become self-reliant individuals. 
                   `,
      image: education
    },
    {
      service: 'Soft Skills',
      description: `we also prioritize the development of soft skills 
                    in our children. We understand that these skills, 
                    such as communication, teamwork, and time management,
                    are essential for their personal and professional growth. 
                    Through various workshops and activities, we help our children 
                    develop these skills, which will serve them well in all aspects 
                    of their lives.In conclusion, our NGO's services go beyond 
                    just providing education. We believe in creating a nurturing 
                    and supportive environment for the children under our care, 
                    where they can grow into responsible and empowered individuals.
                   `,
      image: softSkills
    },
    {
      service: 'Artisanal Skills',
      description: `We strongly believe in equipping the children with 
                    practical skills that will enable them to be 
                    self-sufficient and contribute to the growth of 
                    their communities. As part of our services, we offer 
                    artisan skills training to our older children, where 
                    they can learn various trades such as tailoring, 
                    crocheting, soap and candle making among others. 
                    These skills not only provide them with a means to earn 
                    a living but also instill a sense of pride and ownership in 
                    their work.
                   `,
      image: artisanalSkills
    },
    {
      service: 'Accomodation',
      description: `At our NGO, 
                    we understand that education alone is not enough to ensure a 
                    child's overall development. Hence, we also provide 
                    accommodation to a select few children who lack a 
                    stable and safe living environment, nutritious food, and a nurturing 
                    environment that they can call home. 
                    `,
      image: education
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
