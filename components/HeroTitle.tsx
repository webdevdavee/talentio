const HeroTitle = () => {
  return (
    <div className="flex flex-col gap-4 items-start">
      <span className="flex flex-col gap-4 items-start">
        <h1 className="text-6xl font-bold">
          Discover <br /> more than
        </h1>
        <p className="text-primary text-6xl font-bold capitalize">2000+ jobs</p>
      </span>
      <p className="text-lg">
        Great platform for the job seeker that is searching for <br /> new
        career heights and passionate about startups.
      </p>
    </div>
  );
};

export default HeroTitle;
