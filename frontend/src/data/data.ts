let tId = 0;

function createTaskId() {
  return tId++;
}

export const tasks = [
  {
    id: createTaskId(),
    title: "Design Meeting",
    start: "Mar. 1",
    end: "Mar. 3",
    description: "3/4 Design Phase Review",
    statusColor: "#969696",
    importanceColor: "#FF0000",
    categoryColor: "#1983FF",
  },
  {
    id: createTaskId(),
    title: "Project A",
    start: "Mar. 1",
    end: "Mar. 2",
    description:
      "some description heresome description heresome description heresome description heresome description heresome description heresome description here",
    statusColor: "#DDD",
    importanceColor: "#FF9900",
    categoryColor: "#1983FF",
  },
];

export const treeData = [
  {
    id: createTaskId(),
    title: "Design Meeting",
    start: "Mar. 1",
    end: "Mar. 3",
    description: "3/4 Design Phase Review",
    statusColor: "#969696",
    importanceColor: "#FF0000",
    categoryColor: "#1983FF",
    children: [
      {
        id: createTaskId(),
        title: "Project A",
        start: "Mar. 1",
        end: "Mar. 2",
        description:
          "some description heresome description heresome description heresome description heresome description heresome description heresome description here",
        statusColor: "#DDD",
        importanceColor: "#FF9900",
        categoryColor: "#1983FF",
        children: [
          {
            id: createTaskId(),
            title: "Project B",
            start: "Mar. 1",
            end: "Mar. 2",
            description: "some description",
            statusColor: "#DDD",
            importanceColor: "#FF9900",
            categoryColor: "#1983FF",
          },
        ],
      },
      {
        id: createTaskId(),
        title: "Project B",
        start: "Mar. 1",
        end: "Mar. 2",
        description: "some description",
        statusColor: "#DDD",
        importanceColor: "#FF9900",
        categoryColor: "#1983FF",
      },
    ],
  },
  {
    id: createTaskId(),
    title: "Project C",
    start: "Mar. 3",
    end: "Mar. 5",
    description: "some description",
    statusColor: "#DDD",
    importanceColor: "#FF9900",
    categoryColor: "#1983FF",
  },
];
