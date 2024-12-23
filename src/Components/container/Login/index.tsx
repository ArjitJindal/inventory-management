import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../atoms/Card";
import { Label } from "../../atoms/Label";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { MyContext } from "../../../context/Context";

export function Login() {
  const [role, setRole] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const context = React.useContext(MyContext);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (!role) setError("Please enter a role (admin | user)");
    if (["admin", "user"].includes(role.toLowerCase())) {
      context?.setSharedState({
        view: role.toLocaleLowerCase() as "admin" | "user",
      });
    } else setError("Please enter a valid role (admin | user)");
  };

  return (
    <Card className="w-[350px] bg-gray-700 border border-gray-400">
      <CardHeader>
        <CardTitle className="text-white">Inventory Management</CardTitle>
        <CardDescription className="text-gray-100">
          It is an inventory management portal
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-gray-200" htmlFor="role">
                Role
              </Label>
              <Input
                id="role"
                className="placeholder:text-gray-300 text-gray-100"
                placeholder="Enter the role (admin | user)"
                onChange={(e) => setRole(e.target.value)}
                autoFocus
              />
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full" variant="outline" type="submit">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default Login;
