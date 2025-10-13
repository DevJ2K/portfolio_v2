"use client";

import { useWorkExperience } from "@/providers/WorkExperienceProvider";
import { marked } from "marked";
import Image from "next/image";
import DOMPurify from "dompurify";
import { MdClose } from "react-icons/md";

const ModalWorkExperience = () => {
  const { activeWorkExperience } = useWorkExperience();

  const getSanitizedDescription = (description: string) => {
    return DOMPurify.sanitize(marked(description).toString());
  };

  const closeModal = () => {
    (
      document.getElementById("modal_work_experience") as HTMLDialogElement
    )?.close();
  };

  if (!activeWorkExperience)
    return <dialog id="modal_work_experience" className="hidden"></dialog>;

  return (
    <dialog id="modal_work_experience" className="modal">
      <div className="modal-box bg-background text-foreground rounded-xl">
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex gap-2.5 justify-center items-center">
            <div className="size-9 rounded-md overflow-hidden">
              <Image
                src={activeWorkExperience.logo}
                alt="Assistant J2K"
                width="400"
                height="400"
              />
            </div>
            <div>
              <h3 className="text-body font-semibold">
                {activeWorkExperience.company}
              </h3>
              <p className="text-sm opacity-70">{`${activeWorkExperience.position} | ${activeWorkExperience.duration}`}</p>
            </div>
          </div>
          <MdClose
            className="cursor-pointer text-black hover:opacity-70"
            onClick={closeModal}
          />
        </div>

        <div className="h-px bg-black/15 my-4">&nbsp;</div>
        <p
          className="text-body whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: getSanitizedDescription(activeWorkExperience.description),
          }}
        ></p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>

      {/* <UModal
      v-model:open="isModalOpen"
      class="text-foreground"
      :title="workExperience.company"
      :description="`${workExperience.position} | ${workExperience.duration}`"
    >
      <!-- <template #header>
        <div class="flex items-center justify-between w-full">
          <div class="flex gap-2 justify-center items-center">
            <div class="min-h-6 min-w-6 size-6 rounded-md overflow-hidden">
              <NuxtImg :src="workExperience.logo" alt="Assistant J2K" width="400" />
            </div>
            <h3 class="text-body font-semibold">{{ workExperience.company }}</h3>

          </div>
          <Icon name="maki:cross" size="16" class="cursor-pointer text-black hover:text-gray-800" @click="toggleModal" />
        </div>
      </template> -->

      <template #body>
        <p class="text-body whitespace-pre-line" v-html="sanitizedDescription">
        </p>
      </template>
    </UModal> */}
    </dialog>
  );
};

export default ModalWorkExperience;
