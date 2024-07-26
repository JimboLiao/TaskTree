import { styled } from "@mui/material";
import WorkspaceTitle from "../components/WorkspaceTitle";
import Tree from "../components/Tree";
import { useEffect, useState } from "react";
import { TaskInfo, createTaskApi, getSubTasksApi } from "../api/taskAPI";
import { useParams } from "react-router-dom";
import TaskTableModal from "../components/TaskTableModal";
import SubtaskModal from "../components/SubtaskModal";

const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  paddingTop: "20px",
  paddingBottom: "20px",
  paddingLeft: "50px",
  paddingRight: "50px",
});

const TreeViewPage = () => {
  const { categoryId } = useParams();
  const [treeData, setTreeData] = useState<TaskInfo[] | null>(null);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [parentTaskId, setParentTaskId] = useState<number | null>(null);
  const [isTaskTableModalOpen, setIsTaskTableModalOpen] = useState(false);
  const [isSubtaskModalOpen, setIsSubtaskModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState<(() => void) | null>(null);

  const fetchTreeData = () => {
    if (!categoryId) return;
    getSubTasksApi(0, parseInt(categoryId, 10)).then((data) => {
      setTreeData(data);
    });
  };

  useEffect(() => {
    if (!categoryId) return;

    // get tasks without parent task
    getSubTasksApi(0, parseInt(categoryId, 10)).then((data) => {
      setTreeData(data);
    });
  }, [categoryId]);

  return (
    <>
      <StyledContainer>
        <WorkspaceTitle title="Treeview" />
        {treeData && (
          <Tree treeData={treeData} onEdit={handleEditTask} onAdd={handleAdd} />
        )}
      </StyledContainer>
      <TaskTableModal
        isModalOpen={isTaskTableModalOpen}
        onModalClose={handleCloseTaskTableModal}
        taskId={editTaskId}
      />
      <SubtaskModal
        isOpen={isSubtaskModalOpen}
        onClose={handleCloseSubtaskModal}
        onAddSubtask={handleAddSubTask}
      />
    </>
  );

  function handleEditTask(taskId: number) {
    setEditTaskId(taskId);
    setIsTaskTableModalOpen(true);
  }
  function handleCloseTaskTableModal() {
    setIsTaskTableModalOpen(false);
    fetchTreeData();
    setEditTaskId(null);
  }
  function handleCloseSubtaskModal() {
    setIsSubtaskModalOpen(false);
    setUpdateData(null);
  }
  function handleAddSubTask(title: string) {
    if (!categoryId || parentTaskId === null) return;

    const newTask = {
      title,
      start: new Date(),
      end: new Date(),
      isAllDay: true,
      parentTaskId,
    };

    createTaskApi(newTask, parseInt(categoryId!, 10)).then(() => {
      if (updateData) {
        updateData();
        setUpdateData(null);
      }
      setIsSubtaskModalOpen(false);
    });
  }
  // handle click on add button of treenode
  function handleAdd(taskId: number, cb: () => void) {
    setUpdateData(() => cb);
    setParentTaskId(taskId);
    setIsSubtaskModalOpen(true);
  }
};

export default TreeViewPage;
