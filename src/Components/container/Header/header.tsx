import { useContext } from "react";
import { Switch } from "../../atoms/Switch";
import { LogOut } from "lucide-react";
import { MyContext } from "../../../context/Context";

const Header = () => {
  const context = useContext(MyContext);
  if (!context) return null;

  const handleChange = (checked: boolean) => {
    context.setSharedState({ view: checked ? "user" : "admin" });
  };

  const handleExit = () => {
    context.setSharedState({ view: "" });
  };

  return (
    <header className="w-[100vw] bg-primary h-12 sticky top-0 z-10 flex justify-end items-center px-4 border-b border-gray-800">
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center border-r border-gray-800 pr-4 border-dashed">
          <p className="text-white">admin</p>
          <Switch
            checked={context.sharedState.view === "user"}
            onCheckedChange={handleChange}
          />
          <p className="text-white">user</p>
        </div>
        <LogOut className="stroke-white cursor-pointer" onClick={handleExit} />
      </div>
    </header>
  );
};

export default Header;
