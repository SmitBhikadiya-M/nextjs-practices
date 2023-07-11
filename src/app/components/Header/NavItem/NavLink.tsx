import Link from 'next/link';
import styles from './navlink.module.css';
import React from 'react';

interface props{
    href: string;
    children: React.ReactNode;
    hoverCard?: React.ReactNode;
}

const NavLink: React.FC<props> = ({ href, children, hoverCard }) => {
    return <>
        <Link className={styles.navlink} href={href}>{children}</Link>
        {hoverCard && <div className={styles.hoverCard}>
            {hoverCard}        
        </div>}
    </>
}

export default NavLink;