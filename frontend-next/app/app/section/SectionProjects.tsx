"use client";

import CardProject from "@/components/CardProject";
import HeaderSection from "@/components/HeaderSection";
import PickerBar from "@/components/PickerBar";
import { Project } from "@/types/Project";
import { useState } from "react";

const SectionProjects = ({ projects }: { projects: Project[] }) => {
  const tags = ["AI", "SaaS", "Web", "Mobile"];
  const [selectedTag, setSelectedTag] = useState<string>("AI");

  return (
    <section className="w-full flex flex-col items-center justify-center text-foreground text-center px-4">
      <HeaderSection
        title="Projects"
        description="Projects that reflect what I love to build."
      />

      <div className="my-8">
        <PickerBar
          selectedItem={selectedTag}
          setSelectedItem={setSelectedTag}
          items={tags}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {projects
          .filter((project) => project.tags.includes(selectedTag))
          .map((project, index) => (
            <CardProject project={project} key={index} />
          ))}
      </div>
    </section>
  );
};

export default SectionProjects;
