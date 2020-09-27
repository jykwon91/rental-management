import { request } from "graphql-request";
import { testHost } from "./testSetup";

describe("Resolver - User", () => {
  const amount = 1234;
  const description = "this is a payment";

  const mutation = /* GraphQL */ `
    mutation {
      addPayment(payment: {
        amount: ${amount}
        description: "${description}"
      }){
          amount,
          description
      }
    }
  `;

  it("should addPayment to user", async () => {
    const response: any = await request(testHost, mutation);
    expect(response).toHaveProperty("addPayment");
    //expect(response.addPayment).toHaveProperty("token");
    expect(response.addPayment).toHaveProperty("amount");
    expect(response.addPayment.description).toEqual(description);
  });
});
