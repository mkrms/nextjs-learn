import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function hooks() {
  const items = [
    {
      title: "useState",
      url: "/hooks/useStateSample",
    },
    {
      title: "useEffect",
      url: "/hooks/useEffectSample",
    },
  ];
  return (
    <div className="flex items-center gap-2">
      {items.map((item) => (
        <Link href={item.url}>
          <Card key={item.title} className="w-100">
            <CardContent>
              <h2>{item.title}</h2>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
