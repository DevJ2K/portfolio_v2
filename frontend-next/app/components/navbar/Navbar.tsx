"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LuMenu } from "react-icons/lu";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const sections = [
    "main",
    "projects",
    "work",
    "education",
    "skills",
    "contact",
  ];

  const headerOffset = 140;

  const scrollToSection = (
    sectionId: string,
    event: React.MouseEvent | null
  ) => {
    if (event) {
      event.preventDefault();
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      setMenuIsOpen(false);
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const updateActiveSection = () => {
    const scrollPosition = window.scrollY + headerOffset + 50;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const sectionTop = element.offsetTop;
        const sectionBottom = sectionTop + element.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  };

  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  };

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="fixed mx-auto bg-white z-40 top-12 flex items-center justify-between gap-3 p-2 md:w-[max(65vw,768px)] rounded-full nav-custom-shadow">
      <a href="#" onClick={(event) => scrollToSection("main", event)}>
        <div className="w-22 md:w-26 h-fit rounded-md flex items-center justify-center md:-rotate-6 md:ml-4">
          <Image
            src="/images/DevJ2K.png"
            alt="Assistant J2K"
            width="400"
            height="400"
          />
        </div>
      </a>

      {/* <!-- hidden md:flex --> */}
      <nav
        className={`menu-item ${
          menuIsOpen ? "menu-item-open" : "menu-item-close"
        }`}
      >
        <a
          href="#projects"
          className={`text-black hover:text-blue-500 transition-colors duration-300 cursor-pointer ${
            activeSection === "projects" ? "text-purple-500" : ""
          }`}
          onClick={(event) => scrollToSection("projects", event)}
        >
          Projects
        </a>
        <a
          href="#work"
          className={`text-black hover:text-blue-500 transition-colors duration-300 cursor-pointer ${
            activeSection === "work" ? "text-purple-500" : ""
          }`}
          onClick={(event) => scrollToSection("work", event)}
        >
          Experiences
        </a>
        <a
          href="#education"
          className={`text-black hover:text-blue-500 transition-colors duration-300 cursor-pointer ${
            activeSection === "education" ? "text-purple-500" : ""
          }`}
          onClick={(event) => scrollToSection("education", event)}
        >
          Education
        </a>
        <a
          href="#skills"
          className={`text-black hover:text-blue-500 transition-colors duration-300 cursor-pointer ${
            activeSection === "skills" ? "text-purple-500" : ""
          }`}
          onClick={(event) => scrollToSection("skills", event)}
        >
          Skills
        </a>
      </nav>

      <div>
        <button
          className="hidden md:flex cursor-pointer text-nowrap bg-black text-white px-6 py-4 rounded-full hover:bg-gray-800 transition-colors duration-300"
          onClick={() =>
            (
              document.getElementById("modal_contact") as HTMLDialogElement
            )?.showModal()
          }
        >
          Contact me
        </button>
        <button
          className="flex md:hidden cursor-pointer bg-black text-white px-4 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-300"
          onClick={toggleMenu}
        >
          <LuMenu className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
