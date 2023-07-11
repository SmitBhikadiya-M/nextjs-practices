import React from 'react';
import styles from './button.module.css'
import { BUTTON_THEME } from '@/app/common/constants';

enum ICON_POSITIONS {
    AFTERTEXT = 'aftertext',
    BEFORETEXT = 'beforetext',
}
interface props{
    buttonStyle?: React.CSSProperties
    onClick: () => void;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    theme?: BUTTON_THEME;
    iconPosition?: ICON_POSITIONS
}

const Button: React.FC<props> = ({onClick, children, icon, buttonStyle, theme=BUTTON_THEME.NORMAL, iconPosition=ICON_POSITIONS.BEFORETEXT}) => {

    const iconWrapper = (position: ICON_POSITIONS) => {
        return <span className={`${styles.iconWrapper} ${styles[position]}`}>{icon}</span>;
    }

    return (<>
        <button onClick={onClick} style={buttonStyle} className={`${styles.button} ${styles[theme]} ${styles.iconButton}`}>
            {iconPosition === ICON_POSITIONS.AFTERTEXT ? iconWrapper(ICON_POSITIONS.AFTERTEXT) : ''}
            {children}
            {iconPosition === ICON_POSITIONS.BEFORETEXT ? iconWrapper(ICON_POSITIONS.BEFORETEXT) : ''}
        </button>
    </>)
} 

export default Button;