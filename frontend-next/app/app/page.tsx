"use client";

import { useEffect, useState } from "react";
import SectionContact from "./section/SectionContact";
import SectionEducation from "./section/SectionEducation";
import SectionExperiences from "./section/SectionExperiences";
import SectionFooter from "./section/SectionFooter";
import SectionHero from "./section/SectionHero";
import SectionProjects from "./section/SectionProjects";
import SectionSkills from "./section/SectionSkills";
import { Project } from "@/types/Project";
import { WorkExperience } from "@/types/WorkExperience";
import { Education } from "@/types/Education";
import { Skill } from "@/types/Skill";
import { WorkExperienceProvider } from "@/providers/WorkExperienceProvider";
import ModalWorkExperience from "@/components/ModalWorkExperience";
import ModalContact from "@/components/ModalContact";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/local-data.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects);
        setWorkExperiences(data.experiences);
        setEducations(data.educations);
        setSkills(data.skills);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <main className="flex flex-col items-center justify-center h-screen">
        <div className="loading loading-spinner loading-xl text-purple-500"></div>
      </main>
    );
  }
  return (
    <main className="relative flex flex-col size-full mx-auto text-body text-foreground max-w-[1200px] lg:border-l lg:border-r border-window-border">
      <ModalContact />
      <SectionHero />
      <div className="w-full h-px bg-window-border mb-12" />
      <SectionProjects projects={projects} />
      <div className="w-full h-px bg-window-border mt-18 mb-12" />
      <WorkExperienceProvider>
        <SectionExperiences workExperiences={workExperiences} />
        <ModalWorkExperience />
      </WorkExperienceProvider>
      <div className="w-full h-px bg-window-border mt-18 mb-12" />
      <SectionEducation educations={educations} />
      <div className="w-full h-px bg-window-border mt-18 mb-12" />
      <SectionSkills skills={skills} />
      <div className="w-full h-px bg-window-border mt-18 mb-12" />
      <SectionContact />
      <div className="w-full h-px bg-window-border mt-12" />
      <SectionFooter />
    </main>
  );
}
