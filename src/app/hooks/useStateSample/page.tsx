"use client";
import { CodeDisplay } from "@/components/code-display/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import React, { useState } from "react";

export default function useStateSample() {
  const [count, setCount] = useState(0);
  return (
    <div className="">
      <h2 className="text-lg font-bold mb-5">useState サンプル</h2>

      <h3 className="font-bold mb-3">カウントアップ</h3>
      <div className="flex items-center gap-3">
        <p>Count {count}</p>
        <Button onClick={() => setCount(count + 1)}>カウントアップ</Button>
      </div>
      <div className="">
        <CodeDisplay language="jsx" fileName="CountUp.tsx">
          {`
              const [count, setCount] = useState(0);

              return(
                <p>Count {count}</p>
                <Button onClick={() => setCount(count + 1)}>カウントアップ</Button>
              )
            `}
        </CodeDisplay>
      </div>
    </div>
  );
}
