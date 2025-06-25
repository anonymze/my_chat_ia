import { createTRPCContext } from "@/server/api/trpc";
import { redirect, notFound } from "next/navigation";
import { createCaller } from "@/server/api/root";
import { headers } from "next/headers";
import { auth } from "@/server/auth";

import { AdminPanel } from "./_components/admin-panel";


export default async function AdminPage() {
  // Check authentication
  const session = await auth();

  if (!session) {
    redirect("/login?redirect=/admin");
  }

  // Create TRPC context and caller for server-side calls
  const ctx = await createTRPCContext({ headers: await headers() });
  const caller = createCaller(ctx);

  // Check if user has admin access
  try {
    const isAdmin = await caller.features.isAdmin();

    if (!isAdmin) {
      notFound();
    }
  } catch (error) {
    console.error(error);
    notFound();
  }

  // If user is admin, render the admin panel
  return <AdminPanel />;
}
