import CardSkill from "@/components/CardSkill";
import HeaderSection from "@/components/HeaderSection";
import { Skill } from "@/types/Skill";

const SectionSkills = ({ skills }: { skills: Skill[] }) => {
  return (
    <section className="w-full flex flex-col items-center justify-center text-foreground text-center">
      <HeaderSection
        title="Skills"
        description="Explore the cards to learn how I work with each technology."
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full mt-8">
        {skills.map((skill) => (
          <CardSkill key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  );
};

export default SectionSkills;
