import request from "supertest";
import { app } from "../app";
import sinon from "sinon";
import { expect } from "chai";
import * as userEntity from "../entities/users";
import { NotFoundError, ValidationError } from "../utils/errors/customErrors";
import jwt from "jsonwebtoken";
import { testNoTokenProvided } from "./helpers/authTestHelpers";

describe("User Signup", () => {
  let createUserStub: sinon.SinonStub;

  beforeEach(() => {
    createUserStub = sinon.stub(userEntity, "createUser");
  });

  afterEach(() => {
    createUserStub.restore();
  });

  it("should create a new user", async () => {
    const newUser = {
      email: "test@example.com",
      password: "password123",
    };

    const createdUser = {
      id: 1,
      email: newUser.email,
      username: null,
      createTime: new Date(),
      updateTime: new Date(),
    };
    createUserStub.resolves(createdUser);

    const response = await request(app)
      .post("/api/1.0/users/signup")
      .send(newUser)
      .expect(201);

    expect(createUserStub.calledOnce).to.be.true;
    expect(createUserStub.firstCall.args[0]).to.deep.equal(newUser);
    expect(response.body).to.deep.equal({
      status: "success",
      id: createdUser.id,
    });
  });

  it("should return 400 if email is missing", async () => {
    const newUser = {
      password: "password123",
    };

    const response = await request(app)
      .post("/api/1.0/users/signup")
      .send(newUser)
      .expect(400);

    expect(createUserStub.notCalled).to.be.true;
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.have.property("message");
    expect(response.body.error.message).to.equal(
      "Missing required parameter: email"
    );
  });
});

describe("User Login", () => {
  let loginUserStub: sinon.SinonStub;

  beforeEach(() => {
    loginUserStub = sinon.stub(userEntity, "loginUser");
  });

  afterEach(() => {
    loginUserStub.restore();
  });

  it("should return 200 if email and password are correct", async () => {
    const user = {
      email: "test@example.com",
      password: "password123",
    };
    const userData = {
      id: 1,
      email: user.email,
      username: null,
      createTime: new Date(),
      updateTime: new Date(),
    };
    loginUserStub.resolves(userData);

    const response = await request(app).post("/api/1.0/users/login").send(user);

    expect(loginUserStub.calledOnce).to.be.true;
    expect(loginUserStub.firstCall.args[0]).to.deep.equal(user);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token");
    expect(response.body).to.have.property("user");
    expect(response.body.user).to.have.property("id");
    expect(response.body.user).to.have.property("email");
  });

  it("should return 401 if password is incorrect", async () => {
    const user = {
      email: "test@example.com",
      password: "wrongpassword",
    };

    loginUserStub.rejects(new ValidationError("Password mismatch"));
    const response = await request(app).post("/api/1.0/users/login").send(user);

    expect(loginUserStub.calledOnce).to.be.true;
    expect(loginUserStub.firstCall.args[0]).to.deep.equal(user);
    expect(response.status).to.equal(401);
    expect(response.body).to.have.property("error");
    expect(response.body.error.message).to.equal("Password mismatch");
  });
});

describe("User Get", () => {
  let getUserByIdStub: sinon.SinonStub;
  let jwtVerifyStub: sinon.SinonStub;

  beforeEach(() => {
    getUserByIdStub = sinon.stub(userEntity, "getUserById");
    jwtVerifyStub = sinon.stub(jwt, "verify");
  });

  afterEach(() => {
    getUserByIdStub.restore();
    jwtVerifyStub.restore();
    sinon.restore();
  });

  it("should return 200 and user data if user is authenticated", async () => {
    const userData = {
      id: 1,
      email: "test@example.com",
      username: "testuser",
      createTime: new Date(),
      updateTime: new Date(),
    };
    const decodedToken = { id: 1 };
    getUserByIdStub.resolves(userData);
    jwtVerifyStub.returns(decodedToken);

    const response = await request(app)
      .get("/api/1.0/users")
      .set("Authorization", "Bearer valid_token")
      .set("Cookie", ["token=valid_token"]);

    expect(jwtVerifyStub.calledOnce).to.be.true;
    expect(jwtVerifyStub.firstCall.args[0]).to.equal("valid_token");
    expect(getUserByIdStub.calledOnce).to.be.true;
    expect(getUserByIdStub.firstCall.args[0]).to.equal(1);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status", "success");
    expect(response.body).to.have.property("user");
    expect(response.body.user).to.have.property("id");
    expect(response.body.user).to.have.property("email");
    expect(response.body.user).to.have.property("username");
  });

  it("should return 401 if no token is provided", async () => {
    testNoTokenProvided("get", "/api/1.0/users");
  });

  it("should return 401 if token is invalid", async () => {
    jwtVerifyStub.throws(new jwt.JsonWebTokenError("Invalid token"));

    const response = await request(app)
      .get("/api/1.0/users")
      .set("Authorization", "Bearer invalid_token")
      .set("Cookie", ["token=invalid_token"]);

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property("error");
    expect(response.body.error.message).to.equal("Invalid JWT");
  });

  it("should return 404 if user is not found", async () => {
    const decodedToken = { id: 1 };
    jwtVerifyStub.returns(decodedToken);
    getUserByIdStub.rejects(new NotFoundError("User not found"));

    const response = await request(app)
      .get("/api/1.0/users")
      .set("Authorization", "Bearer valid_token")
      .set("Cookie", ["token=valid_token"]);

    expect(jwtVerifyStub.calledOnce).to.be.true;
    expect(jwtVerifyStub.firstCall.args[0]).to.equal("valid_token");
    expect(getUserByIdStub.calledOnce).to.be.true;
    expect(getUserByIdStub.firstCall.args[0]).to.equal(1);
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property("error");
    expect(response.body.error.message).to.equal("User not found");
  });
});
