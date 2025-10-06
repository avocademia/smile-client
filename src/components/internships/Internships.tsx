'use client'
import styles from './internships.module.scss'
import internship1 from '../../../public/internship-1.jpg'
import internship2 from '../../../public/internship-2.jpg'
import Image from 'next/image'

const Internships = () => {
    const gallery = [
        internship1, internship2
    ]
    return (
        <section className={styles.section}>
            <h1>INTERNSHIPS</h1>
            <article>
                {gallery.map((image, index) => (
                    <Image src={image} alt={`gallery ${index}`} key={index}/>
                ))}
            </article>
            <article>
                <p>
                    Interning at a NGO is an amazing opportunity from students 
                    to gain hands-on experience and contribute to meaningful causes. 
                    At SNILE we offer a supportive and enriching environmentfor 
                    internation students lloking to intern with us. 
                    Our SMILE home offers comfortable accomodation for 
                    interns making their stay both convenient and memorable.

                    To apply for an internship please contact us for further details 
                    and requirements. We look forward to welcoming passionate and dedicated 
                    individuals who are eager to make a difference through their work with us. 
                    Don't miss this chance to enhance your skills and knowledge 
                    while making a positive impact on society
                </p> 
            </article>
        </section>
    )
}

export default Internships