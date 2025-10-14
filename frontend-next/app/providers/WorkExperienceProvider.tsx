"use client";

import { WorkExperience } from "@/types/WorkExperience";
import { createContext, useContext, useState } from "react";

type Ctx = {
  activeWorkExperience: WorkExperience | null;
  setActiveWorkExperience: (WorkExperience: WorkExperience | null) => void;
};

const WorkExperienceCtx = createContext<Ctx | null>(null);

export function WorkExperienceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeWorkExperience, setActiveWorkExperience] =
    useState<WorkExperience | null>(null);

  return (
    <WorkExperienceCtx.Provider
      value={{ activeWorkExperience, setActiveWorkExperience }}
    >
      {children}
    </WorkExperienceCtx.Provider>
  );
}

export function useWorkExperience() {
  const ctx = useContext(WorkExperienceCtx);
  if (!ctx)
    throw new Error(
      "useWorkExperience must be used within WorkExperienceProvider"
    );
  return ctx;
}
