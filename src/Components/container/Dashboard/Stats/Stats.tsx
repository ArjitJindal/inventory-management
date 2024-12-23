import useSWR from "swr";
import { IProjectT, IStat } from "../../../../types/project";
import { fetcher } from "../../../../lib/fetcher";
import { Skeleton } from "../../../atoms/Skeleton";
import StatCard from "./StatCard";
import {
  ShoppingCart,
  CircleDollarSign,
  TriangleAlert,
  Shapes,
} from "lucide-react";
import { PROJECTS_URL } from "../../../../constants";

const Stats = () => {
  const { data: projects = [], isLoading } = useSWR<IProjectT[]>(
    PROJECTS_URL,
    fetcher,
    {
      dedupingInterval: 3600000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
    }
  );

  if (isLoading)
    return (
      <div className="grid-cols-4 gap-4 grid mt-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-45 rounded-md" />
        ))}
      </div>
    );

  const stats: IStat[] = [
    {
      title: "Total product",
      value: projects.filter((project) => !project.disabled).length,
      icon: <ShoppingCart className="stroke-white fill-white" />,
    },
    {
      title: "Total store value",
      value: projects.reduce(
        (total, item) =>
          total +
          (parseFloat(item.value.replace("$", "")) || 0) *
            (item.disabled ? 0 : 1),
        0
      ),
      icon: <CircleDollarSign className="stroke-white" />,
    },
    {
      title: "Out of Stocks",
      value: projects.filter((item) => item.quantity === 0 && !item.disabled)
        .length,
      icon: <TriangleAlert className="stroke-white" />,
    },
    {
      title: "No of Category",
      value: new Set(
        projects
          .filter((project) => !project.disabled)
          .map((item) => item.category)
      ).size,
      icon: <Shapes className="stroke-white" />,
    },
  ];
  return (
    <div className="grid-cols-4 gap-4 grid mt-8">
      {stats.map((stat) => (
        <StatCard stat={stat} key={stat.title} />
      ))}
    </div>
  );
};

export default Stats;
