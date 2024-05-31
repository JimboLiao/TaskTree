import { addTaskAttendee } from "../entities/task";

const requestBodies = {
  signup: {
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
              },
              password: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
  login: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
        },
      },
    },
  },
  createTask: {
    required: ["categoryId", "task"],
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            categoryId: {
              type: "number",
            },
            task: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                start: {
                  type: "string",
                  format: "date-time",
                },
                end: {
                  type: "string",
                  format: "date-time",
                },
                isAllDay: {
                  type: "boolean",
                },
                status: {
                  type: "string",
                  enum: ["TODO", "DONE", "DOING"],
                },
                importance: {
                  type: "string",
                  enum: ["LOW", "NORMAL", "HIGH"],
                },
              },
            },
            resources: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  content: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  addTaskAttendee: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
            },
          },
        },
      },
    },
  },
  updateTaskDetail: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            task: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                start: {
                  type: "string",
                  format: "date-time",
                },
                end: {
                  type: "string",
                  format: "date-time",
                },
                isAllDay: {
                  type: "boolean",
                },
                status: {
                  type: "string",
                  enum: ["TODO", "DONE", "DOING"],
                },
                importance: {
                  type: "string",
                  enum: ["LOW", "NORMAL", "HIGH"],
                },
                reminder: {
                  type: "number",
                  minimum: 0,
                },
                parentTaskId: {
                  type: "number",
                },
                location: {
                  type: "string",
                },
              },
            },
            category: {
              type: "object",
              properties: {
                id: {
                  type: "number",
                },
                name: {
                  type: "string",
                },
                color: {
                  type: "string",
                },
              },
            },
            resources: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  content: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  createResource: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            content: {
              type: "string",
            },
          },
        },
      },
    },
  },
  createCategory: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            category: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                color: {
                  type: "string",
                },
                gCalendarId: {
                  type: "string",
                },
              },
              required: ["name"],
            },
          },
        },
      },
    },
  },
};
export default requestBodies;
