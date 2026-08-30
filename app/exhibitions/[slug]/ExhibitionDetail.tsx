import styles from './page.module.css';

type ExhibitionDetailProps = {
  slug: string;
};

export default function ExhibitionDetail({ slug }: ExhibitionDetailProps) {
  return (
    <main className={styles.page}>
      <h1>Exhibition個別</h1>
      <p>{slug}</p>
    </main>
  );
}