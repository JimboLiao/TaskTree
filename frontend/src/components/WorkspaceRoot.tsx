import { Outlet } from "react-router-dom";
const WorkspaceRoot = () => {
  return (
    <>
      <div>root</div>
      <Outlet />
    </>
  );
};

export default WorkspaceRoot;
