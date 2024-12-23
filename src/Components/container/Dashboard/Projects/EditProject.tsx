import { useState } from "react";
import { IProjectT } from "../../../../types/project";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../atoms/Dialog";
import { Label } from "../../../atoms/Label";
import { Input } from "../../../atoms/Input";
import { Button } from "../../../atoms/Button";
import { mutate } from "swr";
import { PROJECTS_URL } from "../../../../constants";

interface IProps {
  project: IProjectT;
  onClose: () => void;
}

const EditProject = ({ project, onClose }: IProps) => {
  const [updatedProject, setUpdatedProject] = useState<IProjectT>(project);

  const handleSave = async () => {
    await mutate(
      PROJECTS_URL,
      (data?: IProjectT[]) => {
        if (!data) return [];
        return data.map((p) => {
          if (p.name === project.name) {
            return updatedProject;
          }
          return p;
        });
      },
      false
    );
    onClose();
  };

  return (
    <Dialog open>
      <DialogTrigger />
      <DialogContent className="bg-gray-700 border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl font-bold">
            Edit product
          </DialogTitle>
          <DialogDescription className="text-white text-xl">
            {project.name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <Label className="text-gray-200">Category</Label>
            <Input
              id="category"
              defaultValue={project.category}
              className="placeholder:text-gray-300 text-gray-100"
              onChange={(e) =>
                setUpdatedProject({
                  ...updatedProject,
                  category: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-gray-200">Price</Label>
            <Input
              id="price"
              defaultValue={
                project.price.startsWith("$")
                  ? project.price.slice(1)
                  : project.price
              }
              className="placeholder:text-gray-300 text-gray-100"
              type="number"
              onChange={(e) =>
                setUpdatedProject({
                  ...updatedProject,
                  price: e.target.value,
                  value: (
                    parseFloat(e.target.value) * updatedProject.quantity
                  ).toString(),
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-gray-200">Quantity</Label>
            <Input
              id="quantity"
              defaultValue={project.quantity}
              className="placeholder:text-gray-300 text-gray-100"
              type="number"
              onChange={(e) =>
                setUpdatedProject({
                  ...updatedProject,
                  quantity: parseInt(e.target.value),
                  value: (
                    parseFloat(updatedProject.price) * parseInt(e.target.value)
                  ).toString(),
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-gray-200">Value</Label>
            <Input
              id="value"
              disabled
              defaultValue={
                project.value.startsWith("$")
                  ? Number(project.value.slice(1))
                  : Number(project.value)
              }
              value={updatedProject.value}
              className="placeholder:text-gray-300 text-gray-100"
              type="number"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-gray-700 text-green-400 shadow-none hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProject;
