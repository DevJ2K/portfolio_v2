import { Project } from "@/types/Project";
import Image from "next/image";
import Link from "next/link";
import { AiFillSignal } from "react-icons/ai";
import { LuClock, LuLock } from "react-icons/lu";
import { RiGithubLine } from "react-icons/ri";

const CardProject = ({ project }: { project: Project }) => {
  return (
    <div className="flex flex-col max-w-sm gap-4 p-3 rounded-4xl project-card-shadow border-4 border-white bg-ui-background">
      <div className="h-fit w-full rounded-3xl overflow-hidden shadow-md">
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={200}
          className="w-full h-auto"
        />
      </div>
      <h1 className="text-left font-semibold text-xl">{project.title}</h1>

      <div className="flex gap-2 text-body">
        {project.onlineLink && (
          <Link
            href={project.onlineLink}
            target="_blank"
            className="project-badge project-badge-shadow project-badge-hover text-[#38D52A] border border-[#9EFFAB]"
          >
            <AiFillSignal className="text-sm" />
            Online
          </Link>
        )}

        {project.githubLink && (
          <Link
            href={project.githubLink}
            target="_blank"
            className=" project-badge project-badge-shadow project-badge-hover text-[#2A74D5] border border-[#9AC9FF]"
          >
            <RiGithubLine />
            GitHub
          </Link>
        )}

        {project.isSoonOnline && (
          <span className="cursor-default project-badge project-badge-shadow text-[#D5A22A] border border-[#FFDBAB]">
            <LuClock className="text-sm" />
            Soon
          </span>
        )}

        {project.isPrivate && (
          <span className="cursor-default project-badge project-badge-shadow text-[#D52A2A] border border-[#FFABAB]">
            <LuLock className="text-sm" />
            Private
          </span>
        )}
      </div>

      <p className="text-body text-foreground-secondary text-left mb-2">
        {project.description}
      </p>
    </div>
  );
};

export default CardProject;
