import request from "supertest";
import { app } from "../app";
import sinon from "sinon";
import { expect } from "chai";
import * as categoryEntity from "../entities/category";
import jwt from "jsonwebtoken";
import { testNoTokenProvided } from "./helpers/authTestHelpers";

describe("Category Creation", () => {
  let jwtVerifyStub: sinon.SinonStub;
  let createCategoryStub: sinon.SinonStub;

  beforeEach(() => {
    jwtVerifyStub = sinon.stub(jwt, "verify");
    createCategoryStub = sinon.stub(categoryEntity, "createCategory");
  });

  afterEach(() => {
    jwtVerifyStub.restore();
    createCategoryStub.restore();
  });

  it("should create a new category", async () => {
    const newCategory = {
      name: "Test Category",
    };
    const createdCategory = {
      id: 1,
      name: newCategory.name,
      color: "#207C00",
      gCalendarId: null,
    };

    jwtVerifyStub.returns({ id: 1 });
    createCategoryStub.resolves(createdCategory);

    const response = await request(app)
      .post("/api/1.0/categories")
      .set("Authorization", "Bearer valid_token")
      .send({ category: newCategory });

    expect(jwtVerifyStub.calledOnce).to.be.true;
    expect(jwtVerifyStub.firstCall.args[0]).to.equal("valid_token");
    expect(createCategoryStub.calledOnce).to.be.true;
    expect(createCategoryStub.firstCall.args[0]).to.deep.equal({
      category: newCategory,
      userId: 1,
    });
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("status", "success");
    expect(response.body).to.have.property("data");
    expect(response.body.data).to.deep.equal(createdCategory);
  });

  it("should return 401 if no token is provided", async () => {
    testNoTokenProvided("post", "/api/1.0/categories");
  });
});

describe("Category Retrieval", () => {
  let jwtVerifyStub: sinon.SinonStub;
  let getCategoriesStub: sinon.SinonStub;

  beforeEach(() => {
    jwtVerifyStub = sinon.stub(jwt, "verify");
    getCategoriesStub = sinon.stub(categoryEntity, "getCategories");
  });

  afterEach(() => {
    jwtVerifyStub.restore();
    getCategoriesStub.restore();
  });

  it("should return categories", async () => {
    const categories = [
      {
        id: 1,
        name: "Test Category",
        color: "#207C00",
        gCalendarId: null,
      },
    ];
    const decodedToken = { id: 1 };
    jwtVerifyStub.returns(decodedToken);
    getCategoriesStub.resolves(categories);

    const response = await request(app)
      .get("/api/1.0/categories")
      .set("Authorization", "Bearer valid_token");

    expect(jwtVerifyStub.calledOnce).to.be.true;
    expect(jwtVerifyStub.firstCall.args[0]).to.equal("valid_token");
    expect(getCategoriesStub.calledOnce).to.be.true;
    expect(getCategoriesStub.firstCall.args[0]).to.equal(decodedToken.id);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("status", "success");
    expect(response.body).to.have.property("categories");
    expect(response.body.categories).to.deep.equal(categories);
  });

  it("should return 401 if no token is provided", async () => {
    testNoTokenProvided("get", "/api/1.0/categories");
  });
});
