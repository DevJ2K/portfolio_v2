import ButtonSocial from "@/components/ButtonSocial";
import { FaLinkedin } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import { RiGithubLine } from "react-icons/ri";

const SectionHero = () => {
  return (
    <section
      id="main"
      className="w-full h-[90vh] flex flex-col items-center justify-center text-foreground text-center"
    >
      <h1 className="text-title font-extrabold leading-8 max-md:px-4">
        Hey, I’m Theo — aka <span className="gradient-text-1">DevJ2K</span>
      </h1>
      <h2 className="text-subtitle font-extrabold max-md:px-4">
  <span className="gradient-text-2">SaaS</span> Builder & Software Engineer
</h2>
      <p className="text-body text-foreground-secondary mt-4 max-w-2xl text-center max-md:px-4">
        Based in Paris and currently studying at{" "}
        <a
          href="https://42.fr/en/homepage/"
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-text-3"
        >
          42
        </a>
        , I build SaaS products from the first line of code to launch. I care
        about crafting polished user experiences and making sure every feature I
        ship brings real value to the people who use it. My latest product,{" "}
        <a
          href="https://apps.apple.com/fr/app/id6757723423"
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-text-3"
        >
          ACT.
        </a>, is a focus app I
        designed, built and grew on my own.
      </p>

      <div className="flex mt-7 gap-7 md:gap-14 text-body">
        <div className="flex gap-1.25 md:gap-2 justify-center items-center">
          <div className="size-1.5 md:size-2.5 bg-green-400 rounded-full custom-ping" />
          <p>Open for work</p>
        </div>
        <div className="flex gap-1.25 md:gap-2 justify-center items-center">
          <div className="size-1.5 md:size-2.5 bg-red-400 rounded-full custom-ping" />
          <p>Unavailable for internship</p>
        </div>
      </div>
      <div className="flex mt-8 gap-8">
        <ButtonSocial
          icon={<FaTiktok />}
          link="https://www.tiktok.com/@dev.j2k"
          name="J2K🧑🏽‍💻"
        />
        <ButtonSocial
          icon={<RiGithubLine />}
          link="https://github.com/DevJ2K"
          name="@DevJ2K"
        />
        <ButtonSocial
          icon={<FaLinkedin />}
          link="https://www.linkedin.com/in/devj2k"
          name="@DevJ2K"
        />
        <ButtonSocial
          icon={<MdMailOutline />}
          link="mailto:contact@devj2k.com"
          name="contact@devj2k.com"
        />
      </div>
    </section>
  );
};

export default SectionHero;
