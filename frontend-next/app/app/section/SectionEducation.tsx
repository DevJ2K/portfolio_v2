import CardEducation from "@/components/CardEducation";
import HeaderSection from "@/components/HeaderSection";
import { Education } from "@/types/Education";

const SectionEducation = ({ educations }: { educations: Education[] }) => {
  return (
    <section id="education" className="w-full px-4 flex flex-col items-center justify-center text-foreground text-center">
      <HeaderSection
        title="Education"
        description="Where I built the foundations of my software engineering journey."
      />
      <div className="flex flex-wrap justify-center w-full max-w-4xl gap-6 mt-12">
          {educations.map((education, index) => (
            <CardEducation key={index} education={education} />
          ))}
      </div>
    </section>
  );
};

export default SectionEducation;
