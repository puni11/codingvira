import VerifyCertificate from "@/component/VerifyCertificate";
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    certificateid?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
console.log("Certificate ID:", params);
  return (
   <VerifyCertificate
      certificateId={params.certificateid || ""}
    />
  );
}