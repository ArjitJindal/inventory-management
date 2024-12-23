import useSWR from "swr";
import { IProjectT } from "../../../../types/project";
import { PROJECTS_URL } from "../../../../constants";
import { fetcher } from "../../../../lib/fetcher";
import { DataTable } from "./table";
import { useColumns } from "./columns";
import { useState } from "react";
import dynamic from "next/dynamic";

const EditProject = dynamic(() => import("./EditProject"), { ssr: false });

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<IProjectT | null>(
    null
  );
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
  const columns = useColumns({
    onEdit: (project: IProjectT) => {
      setSelectedProject(project);
    },
  });

  if (isLoading) return null;

  const closePopup = () => {
    setSelectedProject(null);
  };
  return (
    <div className="mt-6">
      <DataTable columns={columns} data={projects} />
      {selectedProject && (
        <EditProject project={selectedProject} onClose={closePopup} />
      )}
    </div>
  );
};

export default Projects;
