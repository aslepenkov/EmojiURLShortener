const request = require('supertest');
const app = require('../worker.js');

// describe('Test the root path', () => {
//   test('It should response the GET method', (done) => {
//     request(app)
//       .get('/')
//       .then((response) => {
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//   });
// });
describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .expect(200);
  });
});
// test('adds 1 + 2 to equal 3', (done) => {
//   expect(1 + 2).toBe(3);
//   done();
// });
describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});