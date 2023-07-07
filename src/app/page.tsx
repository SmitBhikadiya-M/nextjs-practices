import Image from 'next/image'
import styles from './page.module.css'
import { Header } from './components/Header/Header'

export default function Home() {
    return (
        <main className={styles.main}>
            <Header />
            <div>
                <div id={styles.section1} className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h1>Peddle</h1>
                    </div>
                </div>
                <div id={styles.section2} className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h1>Peddle</h1>
                    </div>
                </div>
                <div id={styles.section3} className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h1>Peddle</h1>
                    </div>
                </div>
            </div>
        </main>
    )
}
