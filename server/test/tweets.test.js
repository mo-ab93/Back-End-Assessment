const app = require("../app");
const request = require("supertest");

describe("Test tweet endpoints", () => {
  let tweetId;

  it("Creates a tweet", async () => {
    const res = await request(app)
      .post("/tweets")
      .send({
        message: "Test tweet message",
        authorId: 1,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("Test tweet message");
    expect(res.body).toHaveProperty("authorId");
    expect(res.body.authorId).toEqual(1);
    tweetId = res.body.id;
  });

  it("Retrieves all tweets", async () => {
    const res = await request(app).get("/tweets");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty("message");
    expect(res.body[0].message).toEqual("Test tweet message");
    expect(res.body[0]).toHaveProperty("authorId");
    expect(res.body[0].authorId).toEqual(1);
  });

  it("Retrieves a tweet by id", async () => {
    const res = await request(app).get(`/tweets/${tweetId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("Test tweet message");
    expect(res.body).toHaveProperty("authorId");
    expect(res.body.authorId).toEqual(1);
  });

  it("Deletes a tweet", async () => {
    const res = await request(app).delete(`/tweets/${tweetId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("Tweet deleted successfully");
  });
});
