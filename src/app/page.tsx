'use client'

import { useRef, useState, useEffect, MouseEventHandler, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './landing.module.scss';
import Hero from '@/components/hero/Hero';
import Services from '@/components/services/Services';
import Daala from '@/components/daala/Daala';
import Team from '@/components/team/Team';
import BubbleMenu from '@/components/contact/Contact';

interface props {
  children: any,
  delay: number,
  index: number|string,
  onMouseEnter: MouseEventHandler,
  onClick: MouseEventHandler
}

const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }: props) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5});
  return (
      <motion.div
        ref={ref}
        data-index={index}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.2, delay }}
        style={{ marginBottom: '1rem', cursor: 'pointer' }}
      >
        {children}
      </motion.div>
  )
}

interface LandingProps {
  items?: ReactNode[]
  onItemSelect?: (item: ReactNode, index: number) => void
  showGradients?: boolean
  enableArrowNavigation?: boolean
  className?: string
  itemClassName?: string
  displayScrollbar?: boolean
  initialSelectedIndex?: number
}

const Landing = ({
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  itemClassName = '',
  displayScrollbar = true,
  initialSelectedIndex = -1
}:LandingProps) => {

  const items: ReactNode[] = [
    <Hero key={1} onNavigate={(section) => {
        const sectionMap: Record<string, number> = {
          services: 1,
          daala: 2,
          team: 3,
        }

        const idx = sectionMap[section];
        if (idx !== undefined) {
          setSelectedIndex(idx);
          const container = listRef.current;
          const target = container?.querySelector(`[data-index="${idx}"]`) as HTMLElement | null;
          if (container && target) {
            container.scrollTo({
              top: target.offsetTop - 20, // small margin
              behavior: 'smooth',
            })
          }
        }
      }}
    />,
    <Services key={2}/>,
    <Daala key={3}/>,
    <Team key={4}/>,
  ]

  const listRef = useRef<HTMLDivElement|null>(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
  };

  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e:KeyboardEvent) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(items[selectedIndex], selectedIndex);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  const contactOptions = [
  {
    label: 'phone',
    href: '+256123456789',
    ariaLabel: 'Phone',
    rotation: 0,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' },
    icon: 'line-md:phone-filled'
  },
  {
    label: 'whatsapp',
    href: '+256123456789',
    ariaLabel: 'Phone',
    rotation: 0,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' },
    icon: 'cib:whatsapp'
  },
  {
    label: 'email',
    href: '#',
    ariaLabel: 'About',
    rotation: 0,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' },
    icon: 'line-md:email'
  },
  {
    label: 'facebook',
    href: '#',
    ariaLabel: 'Facebook',
    rotation: 0,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' },
    icon: 'ic:baseline-facebook'
  },
  {
    label: 'instagram',
    href: '#',
    ariaLabel: 'Instagram',
    rotation: 0,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' },
    icon: 'line-md:instagram'
  },
];

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement | null
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth'
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  return (
    <main className={styles.page}>  
      <div className={styles.scrollListContainer}>
        <div ref={listRef} className={`${styles.scrollList} ${!displayScrollbar ? styles.noScrollbar : ''}`} onScroll={handleScroll}>
          {items.map((item, index) => (
            <AnimatedItem
              key={index}
              delay={0.1}
              index={index}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => {
                setSelectedIndex(index);
                if (onItemSelect) {
                  onItemSelect(item, index);
                }
              }}
            >
              <div className={`${styles.item } ${selectedIndex === index ? 'selected' : ''} ${itemClassName}`}>
                {item}
              </div>
            </AnimatedItem>
          ))}
        </div>
        {showGradients && (
          <>
            <div className={styles.topGradient} style={{ opacity: topGradientOpacity }}></div>
            <div className={styles.bottomGradient} style={{ opacity: bottomGradientOpacity }}></div>
          </>
        )}
      </div>
      <BubbleMenu
        logo={<span style={{ fontWeight: 700 }}>RB</span>}
        items={contactOptions}
        menuAriaLabel="Toggle navigation"
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition={false}
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
      />
    </main>
  );
};

export default Landing;

