import WorkerDetailsClient from "@/components/WorkerDetailsClient";

export default async function WorkerDetails({
  params,
}: {
  params: Promise<{ workerSlug: string }>;

}) {
const { workerSlug } = await params;
  return <WorkerDetailsClient workerSlug={workerSlug} />;
}
