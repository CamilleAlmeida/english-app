import ReferenceTopicClient from './ReferenceTopicClient';

export const instant = false;

export default async function ReferenceTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ReferenceTopicClient slug={slug} />;
}
