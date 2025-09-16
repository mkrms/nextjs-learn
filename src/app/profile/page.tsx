import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="">
      {session ? (
        <>
          <pre className="bg-slate-100 p-2 text-sm text-slate-700">
            {JSON.stringify(session, null, 2)}
          </pre>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/nextauth" });
            }}
          >
            <Button>Sign Out</Button>
          </form>
        </>
      ) : (
        <h2>セッション情報がありません</h2>
      )}
    </div>
  );
}
