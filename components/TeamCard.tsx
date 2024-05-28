import Image from "next/image";

type TeamCardProps = {
  src: string;
  name: string;
};

const TeamCard = ({ src, name }: TeamCardProps) => {
  return (
    <section className="p-6 border border-gray-400">
      <div className="flex flex-col items-center justify-center gap-3">
        <Image
          src={src}
          width={85}
          height={85}
          alt="team-photo"
          quality={100}
        />
        <p className="text-lg font-medium">{name}</p>
        <p className="text-gray-500">Hiring Team</p>
        <Image
          src="/mail.svg"
          width={20}
          height={20}
          alt="mail"
          quality={100}
        />
      </div>
    </section>
  );
};

export default TeamCard;
