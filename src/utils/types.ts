import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export interface Module {
  id: string;
  name: string;
  description: string;
  menu: MenuItem[];
}
