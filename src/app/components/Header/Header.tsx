"use client";
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './header.module.css'
import { HeaderCard } from './HeaderCard/HeaderCard';
import { SCREENS, SCROLL_DIRECTION } from '@/app/common/constants';

export const Header = () => {

    const headerRef = useRef(null);
    const [toggleMenu, setToggleMenu] = useState(true);
    const [currentWindowWidth, setCurrentWindowWidth] = useState(window.innerWidth);
    const [scrollPosition, setScrollPosition] = useState({ position: 0, direction: SCROLL_DIRECTION.UP });

    useEffect(() => {

        const handleResize = () => {
            setCurrentWindowWidth(window.innerWidth);
        };

        const handleScroll = (e: Event) => {
            setScrollPosition((prevState: any) => {
                let direction;
                if (prevState.position > window.scrollY) {
                    direction = SCROLL_DIRECTION.DOWN
                } else {
                    direction = SCROLL_DIRECTION.UP
                }
                return { position: window.scrollY, direction };
            })
        }

        handleResize();

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        let isAllow = currentWindowWidth >= SCREENS.TABLET;
        if (isAllow && toggleMenu) {
            setToggleMenu(false)
        }
    }, [currentWindowWidth])
    
    function handleViewList(e: any) {
        setToggleMenu(!toggleMenu);
    }

    const setDisplayHandler = useCallback((display: boolean) => {
        setToggleMenu(display);
    }, [toggleMenu])

    return <>
        <header ref={headerRef} className={`${styles.header} ${(toggleMenu || scrollPosition.position > 220) ? styles.bgWhite : ''} ${(scrollPosition.direction === SCROLL_DIRECTION.UP && scrollPosition.position !== 0) ? styles.movedToTop : ''}`}>
            <div className={styles.navWrapper}>
                <div className={styles.navBrand}>
                    <div className={styles.menuIcon} onClick={handleViewList}>
                        {toggleMenu ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>}
                    </div>
                    <div className={styles.navBrandLogo}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 48"
                            width="100%"
                            fill="currentColor"
                        >
                            <path d="M78.7 12.2l-3.5 19.3c0 .2.1.4.3.4 1 .2 1.9.2 3 .1.2 0 .3-.2.3-.3l3.6-19.3c0-.2-.1-.4-.3-.4-1-.2-2-.2-3.1 0-.2-.1-.3.1-.3.2zm-6 0l-.9 5.6c0 .1-.1.1-.1.1-.9-.7-2-1.2-3.2-1.4-4.3-.7-8.8 2.2-10.1 6.6-1.3 4.4 1.1 8.5 5.4 9.2 4.3.7 9.6-1.3 10.5-8.4l1.9-11.6c0-.2-.1-.4-.3-.4-.9-.2-1.9-.2-2.9 0-.1 0-.2.2-.3.3zM70 25.1c-.7 2.4-2.9 4-5.2 3.6-2.3-.4-3.3-2.7-2.5-5.1.7-2.4 2.9-4 5.2-3.6 2.3.4 3.3 2.7 2.5 5.1zM54.8 12.2l-.9 5.6c0 .1-.1.1-.1.1-.9-.7-2-1.2-3.2-1.4-4.3-.7-8.8 2.2-10.1 6.6-1.3 4.4 1.1 8.5 5.4 9.2 4.3.7 9.6-1.3 10.5-8.4l1.9-11.6c0-.2-.1-.4-.3-.4-.9-.2-1.9-.2-2.9 0-.1 0-.3.2-.3.3zm-2.7 12.9c-.7 2.4-2.9 4-5.2 3.6-2.3-.4-3.3-2.7-2.5-5.1.7-2.4 2.9-4 5.2-3.6 2.3.4 3.3 2.7 2.5 5.1zM33 16.4c-4.3-.7-8.8 2.2-10.1 6.6-1.3 4.4 1.1 8.5 5.4 9.3 2.3.4 4.3-.2 5.9-1.2 1.4-.9 2.5-2 3.2-3.2.1-.1 0-.2-.1-.2h-4.4c-.1 0-.1 0-.2.1-1 .8-2.3 1.2-3.4 1-1.5-.3-2.5-1.4-2.7-2.9h11.7s.1 0 .1-.1c1.3-4.4-1.1-8.6-5.4-9.4zm1.6 6.4h-7.4c-.1 0-.1-.1-.1-.1 1-1.9 2.9-3 4.9-2.6 1.5.3 2.4 1.3 2.7 2.7 0-.1-.1 0-.1 0zm57.6-6.4c-4.3-.7-8.8 2.2-10.1 6.6-1.3 4.4 1.1 8.5 5.4 9.3 2.3.4 4.3-.2 5.9-1.2 1.4-.9 2.5-2 3.2-3.2.1-.1 0-.2-.1-.2h-4.4c-.1 0-.1 0-.2.1-1 .8-2.3 1.2-3.4 1-1.5-.3-2.5-1.4-2.7-2.9h11.7s.1 0 .1-.1c1.3-4.4-1.1-8.6-5.4-9.4zm1.6 6.4h-7.4c-.1 0-.1-.1-.1-.1 1-1.9 2.9-3 4.9-2.6 1.5.3 2.4 1.3 2.7 2.7 0-.1-.1 0-.1 0zm-78.7-6.4c-4.1-.7-8.4 2-9.9 6.1h-.1c-.4-.8-.7-1.4-1.1-2.1-.1-.1-.2-.1-.3 0-.8 1-1.4 1.9-1.8 2.9-.1.1-.1.3 0 .4.3.6 1 2.2 2.2 3.8 0 .1.1.2.1.2L2.8 36c0 .2.1.4.3.4.9.1 1.9.1 2.8 0 .2 0 .3-.2.3-.3L7.8 27c.8-4.9 3.3-7.5 6.3-7 2.4.4 3.3 2.8 2.5 5.2-.7 2.1-2.4 3.6-4.4 3.6-1.1 0-1.8-.4-2.4-.8-.1-.1-.3 0-.3.1-.5 1.8-.7 3.1-.8 3.6 0 .1 0 .2.1.2.6.2.9.3 1.6.5 4.4.6 8.8-1.4 10.2-6.6 1.3-4.4-1.2-8.7-5.5-9.4z"></path>
                        </svg>
                    </div>
                </div>
                <div className={styles.navLinksWrapper}>
                    <nav className={`${styles.navLeftLinksWrapper} ${toggleMenu ? styles.show : styles.hide}`}>
                        <ul className={styles.linkItems}>
                            <li><a href="#">How it works</a></li>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Help Center</a></li>
                        </ul>
                    </nav>
                    <nav className={styles.navRightLinksWrapper}>
                        <ul className={styles.linkItems}>
                            <li><a href="#">
                                {SCREENS.TABLET <= currentWindowWidth ? <span className={styles.linkText}>855-655-0134</span> :
                                    <span className={styles.linkText}>Call</span>}
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                </span>
                            </a></li>
                            <li><a href="#">
                                {SCREENS.TABLET <= currentWindowWidth ? <span className={styles.linkText}>Chat now</span> :
                                    <span className={styles.linkText}>Chat</span>}
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.5 7.76564C17.4895 4.89724 15.0474 2.89805 12.1 2.55037C9.23684 2.20268 6.37368 3.68034 4.77368 6.20106C3.17368 8.80869 3.17368 12.0248 4.77368 14.6324L2.5 19.5L7.8053 17.5008C8.64741 18.0223 8.90004 18.1962 9.91057 18.37" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.4724 10.5C19.4234 10.5 21.1885 11.6282 22.0247 13.4145C22.8608 15.2009 22.5821 17.1752 21.2814 18.5855L21.8389 21.5L18.4943 20.3718C16.6363 20.8419 14.7782 20.0897 13.5705 18.5855C12.3628 17.0812 12.177 15.0128 13.0131 13.2265C13.7563 11.6282 15.5215 10.5 17.4724 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </span>
                            </a></li>
                            <li className={styles.signInItem}><a href="#"><span className={styles.linkText}>Sign in</span></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <HeaderCard headerRef={headerRef} display={toggleMenu} setDisplay={setDisplayHandler} />
        </header>
    </>
}