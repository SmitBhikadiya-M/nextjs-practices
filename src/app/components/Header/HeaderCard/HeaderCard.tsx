import { Ref, useEffect, useRef } from "react";
import styles from "./headercard.module.css";
import Button from "../../Button/Button";
import { BUTTON_THEME } from "@/app/common/constants";

export const HeaderCard = (props: {
  display: boolean;
  setMenuHide?: () => void;
  headerRef?: any;
}) => {
  const popupRef = useRef<any>(null);

  useEffect(() => {
    const handleBodyClick = (e: any) => {
      if (
        popupRef.current &&
        !popupRef.current?.contains(e.target) &&
        props.headerRef.current &&
        !props.headerRef.current?.contains(e.target) &&
        props.setMenuHide &&
        props.display
      ) {
        props.setMenuHide();
      }
    };

    if (props.display) document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  return (
    <>
      <div
        className={`${styles.cardWrapper} ${props.display ? styles.show : ""}`}
        ref={popupRef}
      >
        <div className={styles.cardLinks}>
          <ul>
            <li>How it works</li>
            <li>About us</li>
            <li>Blog</li>
            <li>FAQs</li>
            <li>Help center</li>
          </ul>
        </div>
        <div className={styles.border}></div>
        <div className={styles.talkToHuman}>
          <div>Talk to a human</div>
          <div className={styles.call}>855-665-0134</div>
        </div>
        <div className={styles.cardActions}>
          <Button
            onClick={() => {}}
            theme={BUTTON_THEME.GREY}
            buttonStyle={{ color: "black", fontWeight: "700" }}
            
            afterTextIcon={
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
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
            }
          >
            <span className={styles.actionText}>Sign in</span>
          </Button>
          <Button
            onClick={() => {}}
            theme={BUTTON_THEME.YELLOW}
            buttonStyle={{ color: "black", fontWeight: "700" }}
            afterTextIcon={
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
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            }
          >
            <span className={styles.actionText}>Get an offer</span>
          </Button>
        </div>
      </div>
    </>
  );
};
