import React from "react";
import { Link } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaGem, FaGithub } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ImHammer2 } from "react-icons/im";
import { GiPrisoner } from "react-icons/gi";

const Navigation = ({ userObj }) => {
  return (
    <ProSidebar>
      <SidebarHeader>
        <Menu iconShape="square">
          <MenuItem icon={<FaGem />}>
            {" "}
            <Link to="/">Jury</Link>
          </MenuItem>
        </Menu>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem icon={<CgProfile />}>
            <Link to="/profile">{userObj.displayName} Profile</Link>
          </MenuItem>
          <MenuItem icon={<GiPrisoner />}>
            <Link to="/mycase">My Case</Link>
          </MenuItem>
          <MenuItem icon={<ImHammer2 />}>
            <Link to="/mycourt">My Law Court</Link>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <Menu>
          <MenuItem icon={<FaGithub />}>
            <a href="https://github.com/Han-D-Peter/jury">Github</a>
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Navigation;
