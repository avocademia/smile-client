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
                <h3>OUR GOAL</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Accusantium quaerat natus qui perferendis illum tempore 
                    assumenda dolorem fuga architecto? Cumque, veniam autem. 
                    Labore repudiandae dolor commodi expedita ab odio obcaecati?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Ipsum explicabo quasi cumque fugiat laudantium eos atque 
                    temporibus eaque laborum. 
                    Sapiente saepe ullam eos molestias sed expedita veritatis 
                    perferendis repellat laboriosam?
                </p>

                <h3>OUR PROJECTS</h3>

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Accusantium quaerat natus qui perferendis illum tempore 
                    assumenda dolorem fuga architecto? Cumque, veniam autem. 
                    Labore repudiandae dolor commodi expedita ab odio obcaecati?
                </p>

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Ipsum explicabo quasi cumque fugiat laudantium eos atque 
                    temporibus eaque laborum. 
                    Sapiente saepe ullam eos molestias sed expedita veritatis 
                    perferendis repellat laboriosam?
                </p>

            </article>
        </section>
    )
}

export default Daala