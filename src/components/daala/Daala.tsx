'use client'

import styles from './daala.module.scss'
import Image from 'next/image'
import poster from '../../../public/daala.jpg'

const Daala = () => {
    return (
        <section className={styles.section}>
            <article>
                <Image src={poster} alt='daala poster' className={styles.poster}/>
            </article>
            <article>
                <h1>OUR GOAL</h1>
                <p>
                    Daala Skills aims to equip and empower youth in our communities
                    with marketable artisanal skills. 
                </p>
                <p>
                    Currently we focus tailoring and crocheting skills. We intend to
                    diversify the programs to include:

                    <ul>
                        <li>Liquid Soap Production</li>
                        <li>Candle Making</li>
                        <li>Carpentry</li>
                    </ul>
                </p>

                <p>
                    We are also aiming to expand our workshop in order to cater for 
                    larger numbers of willing learners and possibly enlarge our catalog of courses.
                </p>

            </article>
        </section>
    )
}

export default Daala