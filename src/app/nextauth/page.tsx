import { CodeDisplay } from "@/components/code/CodeDisplay";
import { LoginForm } from "@/components/form/LoginForm";
import Link from "next/link";

import React from "react";

export default function NextAuthSample() {
  return (
    <div className="flex flex-row gap-8">
      <div className="w-1/3 min-h-svh">
        <LoginForm className="sticky top-50 left-0" />
      </div>
      <div className="w-2/3">
        <h2 className="font-bold text-xl mb-3">
          NextAuth v5でのメールアドレス認証(credentials認証)
        </h2>

        <section className="my-8">
          <p className="font-bold mb-3">1.事前準備</p>

          <p>
            <Link
              href="https://authjs.dev/getting-started/installation"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Auth.js公式
            </Link>
            から初期セットアップ。
          </p>
        </section>

        <section className="my-8">
          <p className="font-bold mb-3">2.Credential認証のセットアップ</p>

          <p>
            参考：
            <Link
              href="https://authjs.dev/getting-started/authentication/credentials"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Credentials | Auth.js
            </Link>
          </p>

          <CodeDisplay
            language="typescript"
            fileName="src/auth/index.ts"
            maxHeight={1000}
          >
            {`
              import NextAuth, { NextAuthConfig } from "next-auth";
              import Credentials from "next-auth/providers/credentials";

              const authOptions: NextAuthConfig = {
                providers: [
                  Credentials({
                    credentials: {
                      email: {},
                      password: {},
                    },
                    authorize: async (credentials) => {
                      //テストユーザーの定義
                      const user = {
                        id: "1",
                        name: "test",
                        email: "test@example.com",
                        password: "Keisuke0118",
                      };

                      if (
                        credentials?.email === user.email &&
                        credentials?.password === user.password
                      ) {
                        return user;
                      } else {
                        throw new Error("Invalid credentials.");
                      }
                    },
                  }),
                ],
                secret: process.env.AUTH_SECRET,
              };

              export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
              `}
          </CodeDisplay>

          <p className="mb-3">フォームにsignInを統合</p>

          <CodeDisplay
            language="tsx"
            fileName="src/components/LoginForm.tsx"
            maxHeight={1000}
          >
            {`
          //shadcn/uiのログインフォーム抜粋
          <form
            action={async (formData) => {
              "use server";
              await signIn("credentials", {
                //第二引数（options）にformDataもredirectToも記載（結構詰まった）
                email: formData.get("email"),
                password: formData.get("password"),
                redirectTo: "/profile",
              });
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button className="w-full">Login</Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
            `}
          </CodeDisplay>
        </section>

        <section className="my-8">
          <p className="font-bold mb-3">セッション取得方法</p>
          <CodeDisplay language="tsx" fileName="page.tsx">
            {`
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

              `}
          </CodeDisplay>

          <p>
            `const session = await auth()`でセッション情報の取得が可能。
            <br />
          </p>
        </section>

        <p className="my-6">
          2025/09/17 ここまで＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
        </p>
      </div>
    </div>
  );
}
