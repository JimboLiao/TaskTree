import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { TaskInfo, getTasksInRangeApi } from "../api/taskAPI";
import dayjs, { Dayjs } from "dayjs";

// Define the context type
interface TaskInfoContextType {
  taskInfos: TaskInfo[];
  fetchTaskInfos: (start?: Date, end?: Date) => void;
  setStartDate: (startDate: Dayjs) => void;
  setEndDate: (endDate: Dayjs) => void;
}

// Create the context with a default value
const TaskInfoContext = createContext<TaskInfoContextType | undefined>(
  undefined
);

// Custom hook to use the TaskInfoContext
export const useTaskInfo = () => {
  const context = useContext(TaskInfoContext);
  if (context === undefined) {
    throw new Error("useTaskInfo must be used within a TaskInfoProvider");
  }
  return context;
};

// Provider component
export const TaskInfoProvider = ({ children }: { children: ReactNode }) => {
  const [taskInfos, setTaskInfos] = useState<TaskInfo[]>([]);
  const [start, setStart] = useState<Dayjs>(dayjs().startOf("day"));
  const [end, setEnd] = useState<Dayjs>(dayjs().add(1, "day").startOf("day"));
  const setStartDate = (startDate: Dayjs) => {
    setStart(startDate.startOf("day"));
  };
  const setEndDate = (endDate: Dayjs) => {
    setEnd(endDate.startOf("day"));
  };
  const fetchTaskInfos = async () => {
    const taskInfos = await getTasksInRangeApi(start.toDate(), end.toDate());
    setTaskInfos(taskInfos);
  };

  useEffect(() => {
    fetchTaskInfos();
  }, [start, end]);

  return (
    <TaskInfoContext.Provider
      value={{ taskInfos, fetchTaskInfos, setStartDate, setEndDate }}
    >
      {children}
    </TaskInfoContext.Provider>
  );
};
