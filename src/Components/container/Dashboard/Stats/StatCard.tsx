import { IStat } from "../../../../types/project";

interface IProps {
  stat: IStat;
}

const StatCard = ({ stat }: IProps) => {
  return (
    <div className="flex gap-6 bg-green-950 p-6 rounded-2xl">
      {stat.icon}
      <div className="flex flex-col gap-4">
        <p className="text-white">{stat.title}</p>
        <p className="text-white text-5xl">{stat.value}</p>
      </div>
    </div>
  );
};

export default StatCard;
