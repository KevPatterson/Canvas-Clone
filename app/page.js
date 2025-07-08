"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@stackframe/stack";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleWorkspaceClick = () => {
    router.push("/workspace");
  };

  return (
    <div>
      <h1>Termal Print Pro</h1>
      <Button onClick={handleWorkspaceClick}>Toca Aquí</Button>
      <UserButton />
    </div>
  );
}
