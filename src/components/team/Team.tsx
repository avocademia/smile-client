'use client'
import ScrollStack, {ScrollStackItem} from './stack/Stack'
import {Icon} from '@iconify/react'
import Image from 'next/image'
import styles from './team.module.scss'
import { StaticImageData } from 'next/image'
import dpPlaceholder from '../../../public/profile.jpg'

type Member = {
    title: 'Mr.'|'Ms.'|'Mrs.'|'Sir',
    name: string,
    link: string,
    social: 'whatsapp'|'facebook'|'phone'|'linked in',
    jobTitle: string
    dp: StaticImageData
}

const Team = () => {
    const team: Member[] = [
        {
            dp: dpPlaceholder,
            title: 'Mr.',
            name: 'Jane Doe',
            social: 'whatsapp',
            link: 'https://wa.me/254114576058',
            jobTitle: 'Job Title'
        },
        {
            dp: dpPlaceholder,
            title: 'Mr.',
            name: 'Jane Doe',
            social: 'facebook',
            link: 'https://www.facebook.com',
            jobTitle: 'Job Title'
        },
        {
            dp: dpPlaceholder,
            title: 'Mr.',
            name: 'Jane Doe',
            social: 'phone',
            link: '+254114576058',
            jobTitle: 'Job Title'
        },
        {
            dp: dpPlaceholder,
            title: 'Mr.',
            name: 'Jane Doe',
            social: 'linked in',
            link: 'https://www.linkedin.com',
            jobTitle: 'Job Title'
        },
    ]
    return (
        <section className={styles.section}>
            <ScrollStack>
                {team.map((member, index) => (
                    <ScrollStackItem key={index}>
                        <Image src={member.dp} alt={member.name} height={150} width={150} className={styles.dp}/>
                        <h2>{member.title} {member.name}</h2>
                        <h3>{member.jobTitle}</h3>
                        {member.social === 'whatsapp' && 
                            <a href={member.link} target='_blank'>
                                <Icon icon="cib:whatsapp" height={30} width={30}/>
                            </a>
                        } 
                        {member.social === 'facebook' && 
                            <a href={member.link} target='_blank'>
                                <Icon icon="ic:baseline-facebook" height={30} width={30}/>
                            </a>
                        } 
                        {member.social === 'linked in' && 
                            <a href={member.link} target='_blank'>
                                <Icon icon="mdi:linkedin" height={30} width={30}/>
                            </a>
                        } 
                        {member.social === 'phone' && 
                            <a href={`tel:${member.link}`}>
                                <Icon icon="ic:baseline-phone" height={30} width={30}/>
                            </a>
                        } 
                    </ScrollStackItem>
                ))}
            </ScrollStack>
        </section>
    )
}

export default Team