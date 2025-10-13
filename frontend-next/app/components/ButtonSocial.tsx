import Link from "next/link";

const ButtonSocial = ({ icon, link, name }: { icon: React.ReactNode; link: string; name: string }) => {
  return (
    <Link className="flex items-center gap-2 bg-ui-background hover:bg-ui-background-hover/70 border border-ui-border px-5 py-4 rounded-2xl custom-shadow shadow-hover" href={link} target="_blank">
    <div className="flex items-center justify-center size-5 md:size-6 text-2xl">
      {icon}
    </div>
    <span className="hidden md:block">{name}</span>
  </Link>
  );
};

export default ButtonSocial;
