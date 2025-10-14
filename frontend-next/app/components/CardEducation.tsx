import { Education } from "@/types/Education";
import Image from "next/image";
import Link from "next/link";
import { LiaInfinitySolid } from "react-icons/lia";
import { LuLock, LuSquareArrowOutUpRight } from "react-icons/lu";

const CardEducation = ({ education }: { education: Education }) => {
  return (
    <div
      className={`max-w-sm w-full h-full flex items-center justify-center bg-ui-background border rounded-[48px] gap-4 px-4 py-3 shadow-md text-sm ${education.borderColor}`}
    >
      <div className="size-24 h-fit rounded-md overflow-hidden flex items-center justify-center">
        <Image
          src={education.image}
          alt="Assistant J2K"
          width={150}
          height={150}
        />
      </div>
      <div className="h-full flex flex-col text-left justify-between">
        <div>
          <h1 className="font-medium text-base">{education.title}</h1>
          <div className="flex items-center gap-1">
            <p>{education.startDate}</p>
            {education.endDate && (
              <div className="flex gap-1 justify-center items-center">
                <span>-</span>

                {education.endDate !== "Present" ? (
                  <span>{education.endDate}</span>
                ) : (
                  <LiaInfinitySolid className="text-xl" />
                )}
              </div>
            )}
          </div>
          <p>{education.stat}</p>
          <p>{education.description}</p>
        </div>
        <Link
          className={`border rounded-2xl px-4 py-1.5 flex items-center gap-2 w-fit mt-2
        ${
          education.btnActive
            ? "bg-black text-white border-black cursor-pointer hover:bg-gray-800 hover:border-gray-800"
            : "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
        }`}
          href={education.link || "#"}
          target={education.btnActive ? "_blank" : ""}
        >
          <span className="inline-flex items-center gap-2">
            {education.btnActive ? <LuSquareArrowOutUpRight /> : <LuLock />}
            {education.btnText}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CardEducation;
