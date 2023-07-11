import React from 'react';
import styles from './button.module.css'
import { BUTTON_THEME } from '@/app/common/constants';

interface props{
    buttonStyle?: React.CSSProperties
    onClick: () => void;
    children?: React.ReactNode;
    afterTextIcon?: React.ReactNode;
    theme?: BUTTON_THEME
}

const Button: React.FC<props> = ({onClick, children, afterTextIcon, buttonStyle, theme=BUTTON_THEME.NORMAL}) => {

    return (<>
        <button onClick={onClick} style={buttonStyle} className={`${styles.button} ${styles[theme]} ${styles.iconButton}`}>
            {children}
            {afterTextIcon ? <span className={styles.iconWrapper}>{afterTextIcon}</span> : '' }
        </button>
    </>)
} 

export default Button;