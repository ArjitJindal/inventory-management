import Projects from "./Projects";
import Stats from "./Stats/Stats";

const Dashboard = () => {
  return (
    <div className="m-5">
      <h1 className="text-white text-4xl">Inventory stats</h1>
      <Stats />
      <Projects />
    </div>
  );
};

export default Dashboard;
