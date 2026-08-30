import ExhibitionDetail from './ExhibitionDetail';

type ExhibitionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ExhibitionDetailPage({
  params,
}: ExhibitionDetailPageProps) {
  const { slug } = await params;

  return <ExhibitionDetail slug={slug} />;
}