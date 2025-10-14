"use client";

import { useWorkExperience } from "@/providers/WorkExperienceProvider";
import { WorkExperience } from "@/types/WorkExperience";
import Image from "next/image";

const CardWorkExperience = ({
  workExperience,
}: {
  workExperience: WorkExperience;
}) => {
  const { setActiveWorkExperience } = useWorkExperience();

  const openModal = () => {
    setActiveWorkExperience(workExperience);
    (
      document.getElementById("modal_work_experience") as HTMLDialogElement
    )?.showModal();
  };

  return (
    <div className="flex items-center gap-3 w-full col-span-2">
      <h1 className="hidden md:block">
        {workExperience.position} {workExperience.connector}
      </h1>

      <div
        className={`flex gap-1.5 justify-center items-center py-1.5 px-2 rounded-xl border cursor-pointer custom-shadow shadow-hover ${workExperience.clazz}`}
        onClick={openModal}
      >
        <div className="min-h-6 min-w-6 size-6 md:min-h-8 md:min-w-8 md:size-8 rounded-md overflow-hidden">
          <Image
            src={workExperience.logo}
            alt="Assistant J2K"
            width="400"
            height="400"
          />
        </div>
        <h1 className="text-sm">{workExperience.company}</h1>
      </div>
    </div>
  );
};

export default CardWorkExperience;
