import request from "supertest";
import { app } from "../app";
import sinon from "sinon";
import { expect } from "chai";
import * as taskEntity from "../entities/task";
import * as taskOfUserEntity from "../entities/taskOfUser";
import * as categoryEntity from "../entities/category";
import * as userEntity from "../entities/users";
import * as resourceEntity from "../entities/resource";
import jwt from "jsonwebtoken";
import { testNoTokenProvided } from "./helpers/authTestHelpers";

describe("Task Creation", () => {
  let jwtVerifyStub: sinon.SinonStub;
  let createTaskStub: sinon.SinonStub;

  beforeEach(() => {
    jwtVerifyStub = sinon.stub(jwt, "verify");
    createTaskStub = sinon.stub(taskEntity, "createTask");
  });

  afterEach(() => {
    jwtVerifyStub.restore();
    createTaskStub.restore();
  });

  it("should create a task", async () => {
    const categoryId = 1;
    const newTask = {
      title: "New Task",
      start: new Date(),
      end: new Date(),
      description: null,
      isAllDay: true,
      status: "TODO",
      importance: "NORMAL",
      reminder: null,
      parentTaskId: null,
      location: null,
    };
    const resources = ["resource1", "resource2"];
    const userId = 1;
    const decodedToken = { id: userId };
    const createdTask = {
      id: 1,
      title: newTask.title,
      start: newTask.start.toISOString(),
      end: newTask.end.toISOString(),
      description: newTask.description,
      isAllDay: newTask.isAllDay,
      status: newTask.status,
      importance: newTask.importance,
      reminder: newTask.reminder,
      parentTaskId: newTask.parentTaskId,
      location: newTask.location,
      updateTime: new Date().toISOString(),
      createTime: new Date().toISOString(),
      attendee: [{ userId }],
      category: [{ id: categoryId, name: "Uncategorized", color: "#207C00" }],
      resources,
    };

    jwtVerifyStub.returns(decodedToken);
    createTaskStub.resolves(createdTask);

    const response = await request(app)
      .post("/api/1.0/tasks")
      .set("Authorization", `Bearer valid_token`)
      .send({ task: newTask, categoryId, resources });

    expect(jwtVerifyStub.calledOnce).to.be.true;
    expect(jwtVerifyStub.firstCall.args[0]).to.deep.equal("valid_token");
    expect(createTaskStub.calledOnce).to.be.true;
    expect(createTaskStub.firstCall.args[0]).to.deep.equal({
      resources,
      task: {
        ...newTask,
        start: newTask.start.toISOString(),
        end: newTask.end.toISOString(),
      },
      userId,
      categoryId,
    });
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("status", "success");
    expect(response.body).to.have.property("data");
    expect(response.body.data).to.deep.equal(createdTask);
  });

  it("should return 401 if no token is provided", async () => {
    testNoTokenProvided("post", "/api/1.0/tasks");
  });
});

describe("Add Task Attendee", () => {
  let jwtVerifyStub: sinon.SinonStub;
  let addTaskAttendeeStub: sinon.SinonStub;
  let getUserByEmailStub: sinon.SinonStub;
  let getUncategorizedStub: sinon.SinonStub;
  let createUncategorizedStub: sinon.SinonStub;
  let connectTaskCategoryRelationStub: sinon.SinonStub;

  beforeEach(() => {
    jwtVerifyStub = sinon.stub(jwt, "verify");
    addTaskAttendeeStub = sinon.stub(taskOfUserEntity, "createTaskOfUser");
    getUserByEmailStub = sinon.stub(userEntity, "getUserByEmail");
    getUncategorizedStub = sinon.stub(categoryEntity, "getUncategorized");
    createUncategorizedStub = sinon.stub(categoryEntity, "createUncategorized");
    connectTaskCategoryRelationStub = sinon.stub(
      taskEntity,
      "connectTaskCategoryRelation"
    );
  });

  afterEach(() => {
    jwtVerifyStub.restore();
    getUserByEmailStub.restore();
    addTaskAttendeeStub.restore();
    getUncategorizedStub.restore();
    createUncategorizedStub.restore();
    connectTaskCategoryRelationStub.restore();
    sinon.restore();
  });

  it("should add a task attendee", async () => {
    const taskId = 1;
    const email = "newAttendee@example.com";
    const userId = 2;
    const decodedToken = { id: userId };
    const newAttendee = {
      id: 3,
      email,
      updateTime: new Date(),
      createTime: new Date(),
      username: null,
    };
    const newTaskOfUser = {
      id: 4,
      user: newAttendee,
    };
    const uncategorized = {
      id: 5,
      name: "Uncategorized",
      color: "#207C00",
    };

    jwtVerifyStub.returns(decodedToken);
    getUserByEmailStub.resolves(newAttendee);
    addTaskAttendeeStub.resolves(newTaskOfUser);
    getUncategorizedStub.resolves(uncategorized);
    createUncategorizedStub.resolves({});
    connectTaskCategoryRelationStub.resolves({});

    const response = await request(app)
      .post(`/api/1.0/tasks/${taskId}/attendee`)
      .set("Authorization", `Bearer valid_token`)
      .send({ email });

    expect(jwtVerifyStub.calledOnce).to.be.true;
    expect(jwtVerifyStub.firstCall.args[0]).to.deep.equal("valid_token");
    expect(getUserByEmailStub.calledOnce).to.be.true;
    expect(getUserByEmailStub.firstCall.args[0]).to.deep.equal(email);
    expect(addTaskAttendeeStub.calledOnce).to.be.true;
    expect(addTaskAttendeeStub.firstCall.args[0]).to.deep.equal({
      taskId,
      userId: newAttendee.id,
    });
    expect(getUncategorizedStub.calledOnce).to.be.true;
    expect(getUncategorizedStub.firstCall.args[0]).to.deep.equal(
      newAttendee.id
    );
    expect(createUncategorizedStub.notCalled).to.be.true;
    expect(connectTaskCategoryRelationStub.calledOnce).to.be.true;
    expect(connectTaskCategoryRelationStub.firstCall.args[0]).to.deep.equal({
      taskId,
      categoryId: uncategorized.id,
    });
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("status", "success");
    expect(response.body).to.have.property("data");
    expect(response.body.data).to.deep.equal({
      id: newTaskOfUser.id,
      user: {
        ...newTaskOfUser.user,
        createTime: newTaskOfUser.user.createTime.toISOString(),
        updateTime: newTaskOfUser.user.updateTime.toISOString(),
      },
    });
  });

  it("should return 401 if no token is provided", async () => {
    testNoTokenProvided("post", "/api/1.0/tasks/1/attendee");
  });

  it("should return 404 if user not found", async () => {
    const taskId = 1;
    const email = "newAttendee@example.com";
    const userId = 2;
    const decodedToken = { id: userId };

    jwtVerifyStub.returns(decodedToken);
    getUserByEmailStub.resolves(null);

    const response = await request(app)
      .post(`/api/1.0/tasks/${taskId}/attendee`)
      .set("Authorization", `Bearer valid_token`)
      .send({ email });

    expect(response.status).to.equal(404);
    expect(response.body).to.have.property("status", "fail");
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.have.property("message", "User not found");
  });
});

describe("Update Task", () => {
  let jwtVerifyStub: sinon.SinonStub;
  let getTaskByIdStub: sinon.SinonStub;
  let updateTaskStub: sinon.SinonStub;
  let updateTaskCategoryRelationStub: sinon.SinonStub;
  let deleteManyResourcesStub: sinon.SinonStub;
  let createManyResourcesStub: sinon.SinonStub;

  beforeEach(() => {
    jwtVerifyStub = sinon.stub(jwt, "verify");
    getTaskByIdStub = sinon.stub(taskEntity, "getTaskById");
    updateTaskStub = sinon.stub(taskEntity, "updateTask");
    updateTaskCategoryRelationStub = sinon.stub(
      taskEntity,
      "connectTaskCategoryRelation"
    );
    deleteManyResourcesStub = sinon.stub(resourceEntity, "deleteManyResources");
    createManyResourcesStub = sinon.stub(resourceEntity, "createManyResources");
  });

  afterEach(() => {
    jwtVerifyStub.restore();
    getTaskByIdStub.restore();
    updateTaskStub.restore();
    updateTaskCategoryRelationStub.restore();
    deleteManyResourcesStub.restore();
    createManyResourcesStub.restore();
  });

  it("should update a task", async () => {
    const taskId = 1;
    const userId = 2;
    const decodedToken = { id: userId };
    const user = {
      id: userId,
      updateTime: new Date("2024-08-19"),
      createTime: new Date("2024-08-19"),
      email: "test@test.com",
      username: "test",
    };
    const oldCategory = { id: 4, name: "Old Category", color: "#207C00" };
    const oldResources = ["resource1", "resource2"];
    const oldAttendee = [
      {
        id: 3,
        user: user,
      },
    ];

    const oldTask = {
      id: taskId,
      title: "Old task",
      start: new Date("2024-08-22").toISOString(),
      end: new Date("2024-08-22").toISOString(),
      description: null,
      isAllDay: true,
      status: "TODO",
      importance: "NORMAL",
      reminder: 30,
      parentTaskId: null,
      location: null,
      updateTime: new Date("2024-08-22").toISOString(),
      createTime: new Date("2024-08-22").toISOString(),
    };

    const task = {
      ...oldTask,
      title: "Updated Task",
    };
    const category = oldCategory;
    const resources = oldResources;

    jwtVerifyStub.returns(decodedToken);
    getTaskByIdStub.resolves({
      ...oldTask,
      attendee: oldAttendee,
      category: [oldCategory],
      resources: oldResources,
    });
    updateTaskStub.resolves({});
    deleteManyResourcesStub.resolves({});
    createManyResourcesStub.resolves({});

    const response = await request(app)
      .put(`/api/1.0/tasks/${taskId}`)
      .set("Authorization", `Bearer valid_token`)
      .send({ task, category, resources });

    expect(jwtVerifyStub.calledOnce).to.be.true;
    expect(jwtVerifyStub.firstCall.args[0]).to.deep.equal("valid_token");
    expect(getTaskByIdStub.calledOnce).to.be.true;
    expect(getTaskByIdStub.firstCall.args[0]).to.deep.equal(taskId);
    expect(updateTaskStub.calledOnce).to.be.true;
    expect(updateTaskStub.firstCall.args[0]).to.deep.equal({
      task,
      taskId,
    });
    expect(deleteManyResourcesStub.notCalled).to.be.true;
    expect(createManyResourcesStub.notCalled).to.be.true;
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status", "success");
    expect(response.body).to.have.property("message", "Updated successfully");
  });

  it("should return 401 if no token is provided", async () => {
    testNoTokenProvided("post", "/api/1.0/tasks/1");
  });

  it("should return 404 if task not found", async () => {
    const taskId = 1;
    const userId = 2;
    const decodedToken = { id: userId };
    const user = {
      id: userId,
      updateTime: new Date("2024-08-19"),
      createTime: new Date("2024-08-19"),
      email: "test@test.com",
      username: "test",
    };
    const oldCategory = { id: 4, name: "Old Category", color: "#207C00" };
    const oldResources = ["resource1", "resource2"];
    const oldAttendee = [
      {
        id: 3,
        user: user,
      },
    ];

    const oldTask = {
      id: taskId,
      title: "Old task",
      start: new Date("2024-08-22"),
      end: new Date("2024-08-22"),
      description: null,
      isAllDay: true,
      status: "TODO",
      importance: "NORMAL",
      reminder: 30,
      parentTaskId: null,
      location: null,
      updateTime: new Date("2024-08-22"),
      createTime: new Date("2024-08-22"),
    };

    const task = {
      ...oldTask,
      title: "Updated Task",
    };
    const category = oldCategory;
    const resources = oldResources;

    jwtVerifyStub.returns(decodedToken);
    getTaskByIdStub.resolves(null);

    const response = await request(app)
      .put(`/api/1.0/tasks/${taskId}`)
      .set("Authorization", `Bearer valid_token`)
      .send({ task, category, resources });

    expect(jwtVerifyStub.calledOnce).to.be.true;
    expect(jwtVerifyStub.firstCall.args[0]).to.deep.equal("valid_token");
    expect(getTaskByIdStub.calledOnce).to.be.true;
    expect(getTaskByIdStub.firstCall.args[0]).to.deep.equal(taskId);
    expect(updateTaskStub.notCalled).to.be.true;
    expect(deleteManyResourcesStub.notCalled).to.be.true;
    expect(createManyResourcesStub.notCalled).to.be.true;
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property("status", "fail");
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.have.property("message", "Task not found");
  });
});

describe("Task Retrieval", () => {});
