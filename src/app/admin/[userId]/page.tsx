import UserDetailsComponent from "@/components/UserDetailsComponent";

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return <UserDetailsComponent userId={userId} isAdminPage ={true} />;
}
 