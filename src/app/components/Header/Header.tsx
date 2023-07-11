"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import { HeaderCard } from "./HeaderCard/HeaderCard";
import { BUTTON_THEME, SCREENS, SCROLL_DIRECTION } from "@/app/common/constants";
import Card from "../Card/Card";
import Button from "../Button/Button";
import NavBrand from "./NavBrand/NavBrand";
import NavLink from "./NavItem/NavLink";

export const Header = () => {
  const headerRef = useRef(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [currentWindowWidth, setCurrentWindowWidth] = useState(
    window.innerWidth
  );
  const [scrollPosition, setScrollPosition] = useState({
    position: 0,
    direction: SCROLL_DIRECTION.UP,
  });

  useEffect(() => {
    const handleResize = () => {
      setCurrentWindowWidth(window.innerWidth);
    };

    const handleScroll = (e: Event) => {
      setScrollPosition((prevState: any) => {
        let direction;
        if (prevState.position > window.scrollY) {
          direction = SCROLL_DIRECTION.DOWN;
        } else {
          direction = SCROLL_DIRECTION.UP;
        }
        return { position: window.scrollY, direction };
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let isAllow = currentWindowWidth >= SCREENS.LAPTOP;
    if (isAllow && toggleMenu) {
      setToggleMenu(false);
    }
  }, [currentWindowWidth]);

  function handleViewList(e: any) {
    setToggleMenu(!toggleMenu);
  }

  function handleCall() {
    console.log("Call");
  }

  function handleChat() {
    console.log("Chat");
  }

  function handleSignin(){
    console.log("Signin");
  }

  const hideMenu = useCallback(() => {
    setToggleMenu(false);
  }, [toggleMenu]);

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${
          toggleMenu || scrollPosition.position > 220 ? styles.bgWhite : ""
        } ${
          scrollPosition.direction === SCROLL_DIRECTION.UP &&
          scrollPosition.position !== 0 &&
          currentWindowWidth > SCREENS.TABLET
            ? styles.movedToTop
            : ""
        }`}
      >
        <div className={styles.navWrapper}>
          <div className={styles.navBrand}>
            <div className={styles.menuIcon} onClick={handleViewList}>
              {toggleMenu ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </div>
            <NavBrand />
          </div>
          <div className={styles.navLinksWrapper}>
            <nav
              className={`${styles.navLeftLinksWrapper} ${
                toggleMenu ? styles.show : styles.hide
              }`}
            >
              <ul className={styles.linkItems}>
                <li>
                  <NavLink href="#" children={"How it works"} />
                </li>
                <li>
                  <NavLink href="#" children={"About us"} />  
                </li>
                <li>
                  <NavLink href="#" children={"Blog"} hoverCard={<Card />}/>
                </li>
                <li>
                  <NavLink href="#" children={"FAQs"} />
                </li>
                <li>
                  <a href="#">Help Center</a>
                </li>
              </ul>
            </nav>
            <nav className={styles.navRightLinksWrapper}>
              <ul className={styles.linkItems}>
                <li>
                  <Button
                    onClick={handleCall}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    }
                    theme={SCREENS.TABLET <= currentWindowWidth ? BUTTON_THEME.NORMAL : BUTTON_THEME.GREY}
                  >
                    {SCREENS.TABLET <= currentWindowWidth ? (
                      <span className={styles.linkText}>855-655-0134</span>
                    ) : (
                      <span className={styles.linkText}>Call</span>
                    )}
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={handleChat}
                    icon={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.5 7.76564C17.4895 4.89724 15.0474 2.89805 12.1 2.55037C9.23684 2.20268 6.37368 3.68034 4.77368 6.20106C3.17368 8.80869 3.17368 12.0248 4.77368 14.6324L2.5 19.5L7.8053 17.5008C8.64741 18.0223 8.90004 18.1962 9.91057 18.37"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M17.4724 10.5C19.4234 10.5 21.1885 11.6282 22.0247 13.4145C22.8608 15.2009 22.5821 17.1752 21.2814 18.5855L21.8389 21.5L18.4943 20.3718C16.6363 20.8419 14.7782 20.0897 13.5705 18.5855C12.3628 17.0812 12.177 15.0128 13.0131 13.2265C13.7563 11.6282 15.5215 10.5 17.4724 10.5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    }
                    theme={SCREENS.TABLET <= currentWindowWidth ? BUTTON_THEME.NORMAL : BUTTON_THEME.GREY}
                  >
                    {SCREENS.TABLET <= currentWindowWidth ? (
                      <span className={styles.linkText}>Chat now</span>
                    ) : (
                      <span className={styles.linkText}>Chat</span>
                    )}
                  </Button>
                </li>
                <li className={styles.signInItem}>
                  <Button 
                    onClick={handleSignin} 
                    theme={BUTTON_THEME.GREY}
                  >
                    <span className={styles.linkText}>Sign in</span>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {toggleMenu && <HeaderCard
          headerRef={headerRef}
          display={toggleMenu}
          setMenuHide={hideMenu}
        /> }
      </header>
    </>
  );
};
