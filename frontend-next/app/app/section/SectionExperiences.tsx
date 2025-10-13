import CardWorkExperience from "@/components/CardWorkExperience";
import HeaderSection from "@/components/HeaderSection";
import { WorkExperience } from "@/types/WorkExperience";

const SectionExperiences = ({
  workExperiences,
}: {
  workExperiences: WorkExperience[];
}) => {
  return (
    <section id="work" className="w-full flex flex-col items-center justify-center text-foreground text-center px-4">
      <HeaderSection
        title="Experiences"
        description="A brief look at where I've worked and the roles I've held."
      />

      <div className="flex flex-col items-center justify-center w-full max-w-4xl gap-5 md:gap-8 mt-12">
        {workExperiences.map((work, index) => (
          <div
            key={index}
            className="grid grid-cols-3 items-center justify-center w-full gap-3"
          >
            <p className="col-span-1 text-foreground-secondary/70 text-left">
              {work.duration}
            </p>
            <CardWorkExperience workExperience={work} />
          </div>
        ))}
      </div>

      {/* <div class="flex flex-col items-center justify-center w-full max-w-4xl gap-5 md:gap-8 mt-12">
      <div v-for="(work, index) in workExperiences" :key="index" class="grid grid-cols-3 items-center justify-center w-full gap-3">
        <p class="col-span-1 text-foreground-secondary/70 text-left">
          {{ work.duration }}
        </p>
        <WorkItem
          class="col-span-2"
          :work-experience="work" />
      </div>
    </div> */}
    </section>
  );
};

export default SectionExperiences;
