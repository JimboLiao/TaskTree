import request from "supertest";
import { expect } from "chai";
import { app } from "../../app";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export function testNoTokenProvided(method: HttpMethod, endpoint: string) {
  it(`should return 401 if no token is provided for ${method.toUpperCase()} ${endpoint}`, async () => {
    const response = await request(app)[method](endpoint);

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property("error");
    expect(response.body.error.message).to.equal("No JWT");
  });
}
