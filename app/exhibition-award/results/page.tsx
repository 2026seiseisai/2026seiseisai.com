import ExhibitionAwardResults from '../results/Results';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: '興味深い展示だったで賞 集計 | 菁々祭',
};

export default function ResultsPage() {
  return <ExhibitionAwardResults />;
}
