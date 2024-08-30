import { Button } from "@/components/ui/button";
import db from "@/lib/db.server";
import Image from "next/image";

export default async function Home() {
  const examples = await db.example.findMany();

  return (
    <main>
      <Button> Hello World </Button>
      <pre>{JSON.stringify(examples, null, 2)}</pre>
    </main>
  );
}
