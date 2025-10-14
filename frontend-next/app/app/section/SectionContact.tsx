import ButtonSocial from "@/components/ButtonSocial";
import HeaderSection from "@/components/HeaderSection";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { RiGithubLine } from "react-icons/ri";

const SectionContact = () => {
  return (
    <section
      id="contact"
      className="w-full px-4 flex flex-col items-center justify-center text-foreground text-center"
    >
      <HeaderSection
        title="Contact"
        description="You can find my contact information below if you'd like to get in touch."
      />

      <div className="flex flex-wrap mt-8 gap-8 max-w-3xl justify-center">
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
        <ButtonSocial
          icon={<FaInstagram />}
          link="https://www.instagram.com/DevJ2K"
          name="@DevJ2K"
        />
      </div>

      <div className="flex mt-12 gap-7 md:gap-14 text-body">
        <div className="flex gap-1.25 md:gap-2 justify-center items-center">
          <div className="size-1.5 md:size-2.5 bg-green-400 rounded-full custom-ping" />
          <p>Available for Internship</p>
        </div>
        <div className="flex gap-1.25 md:gap-2 justify-center items-center">
          <div className="size-1.5 md:size-2.5 bg-green-400 rounded-full custom-ping" />
          <p>Open for work</p>
        </div>
      </div>

      <button
        className="border rounded-full px-6 py-4 flex items-center gap-2 w-fit mt-12 bg-black text-white border-black cursor-pointer hover:bg-gray-800 hover:border-gray-800"
        onClick={() =>
          (
            document.getElementById("modal_contact") as HTMLDialogElement
          )?.showModal()
        }
      >
        Contact me
      </button>
    </section>
  );
};

export default SectionContact;
