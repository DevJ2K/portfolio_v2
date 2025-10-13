const HeaderSection = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full text-foreground text-center gap-4 md:gap-6">
      <div className="bg-white px-4 py-1.5 rounded-xl custom-shadow">
        <h2 className="text-body font-medium">{title}</h2>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default HeaderSection;
