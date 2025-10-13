'use client'

import styles from './hero.module.scss'
import logo from '../../../public/logo.png'
import Image from 'next/image'

interface HeroProps {
  onNavigate?: (section: string) => void;
}

const Hero = ({onNavigate}:HeroProps) => {
    const sections = [
        'services',
        'daala',
        'internships',
        'team',
    ]
    return (
        <section className={styles.section}>
            <article className={styles.logoContainer}>
                <div className={styles.logoTextContainer}>
                    <Image src={logo} alt='logo' className={styles.logo}/>
                    
                </div>
                <div className={styles.logoTextContainer}>
                    <h1>SMILE</h1>
                    <p>Supporting Minors to Improve Life</p>
                </div>
            </article>
            <article className={styles.action}>
                {sections.map((section) => (
                    <button key={section} onClick={() => onNavigate?.(section)} className={styles[section]}>
                        <h2 className={styles.buttonText}>{section}</h2>
                    </button>
                ))}
            </article>
        </section>
    )
}

export default Hero