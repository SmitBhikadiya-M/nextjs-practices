import styles from "./card.module.css";

export default function Card(props: any) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <h2>Hello</h2>
      </div>
      <div className={styles.breakLine}></div>
      <div className={styles.cardBody}>
        <div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut rerum
          fugit nulla. Magnam, eum non? Ab consequuntur suscipit natus eum.
          Minima ipsam perferendis qui voluptates, quasi ex a culpa ipsum.
        </div>
      </div>
    </div>
  );
}
