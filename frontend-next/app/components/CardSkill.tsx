import { Skill } from "@/types/Skill";
import { ICON_MAP } from "@/utils/IconMap";
import { useEffect, useState } from "react";
import { BsQuestionLg } from "react-icons/bs";
import { LuCheck } from "react-icons/lu";

const CardSkill = ({ skill }: { skill: Skill }) => {
  const [showingFace, setShowingFace] = useState<"front" | "back">("front");
  const [dynamicHeight, setDynamicHeight] = useState(200);

  const toggleFace = () => {
    setShowingFace(showingFace === "front" ? "back" : "front");
  };

  useEffect(() => {
    const estimatedFrontHeight = 120;
    const estimatedBackHeight = 50 + (skill.achievements?.length || 0) * 40;

    setDynamicHeight(Math.max(estimatedFrontHeight, estimatedBackHeight, 0));
  }, [skill]);

  return (
    <div className="flip-card bg-transparent group h-full" onClick={toggleFace}>
      <div
        className={`flip-card-inner size-full p-4 flex flex-col justify-center items-center border border-ui-border rounded-lg skill-custom-shadow relative w-full h-full
          ${showingFace === "front" ? "rotate-y-0" : "rotate-y-180"}
          `}
        style={{ minHeight: `${dynamicHeight}px` }}
      >
        <div className="flip-card-front flex flex-col items-center justify-center gap-2">
          <div className="flex items-center justify-center border-2 md:border-4 border-white p-1 size-fit rounded-xl text-2xl md:text-3xl">
            {ICON_MAP[skill.name.toLowerCase()] || <BsQuestionLg />}
          </div>
          <h1 className="font-medium text-center">{skill.name}</h1>
          <p className="absolute bottom-2 text-xs text-foreground-secondary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Click to reveal
          </p>
        </div>

        <div className="flip-card-back rotate-y-180 p-3 flex flex-col items-start justify-start gap-2 text-sm">
          <h1 className="font-medium text-left">{skill.description}</h1>
          <ul className="list-inside text-left flex flex-col gap-2">
            {skill.achievements.map((achievement) => (
              <li
                key={achievement}
                className="flex items-center justify-start gap-2"
              >
                <div className="flex items-center justify-center size-4 md:size-5 text-[#65DB64] bg-[#A6F9A5] rounded-full border border-[#65DB64]">
                  <LuCheck className="size-3 md:size-4" />
                </div>
                <span className="text-foreground-secondary max-sm:text-xs">
                  {achievement}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardSkill;
