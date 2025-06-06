import React from "react";

export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl my-10 font-bold uppercase text-center">
      {children}
    </h1>
  );
}
