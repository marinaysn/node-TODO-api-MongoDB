const request = require("supertest");
const expect = require("expect");

//locat imports
const { app } = require("./../server.js");
const { Todo } = require("./../models/todo.js");
let i;

beforeEach((done) => {
    //Todo.remove({}).then(() => done());
    Todo.count().then((count) => {
        i = count
        console.log(` count is : ${i}`)
    })
        .then(() => done());

});

describe("POST /todos", () => {

    it("should create a new todo", (done) => {

    let text = "Test todo text mm1";

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
            expect(todos.length).toBe(i+1);
            expect(todos[i].text).toBe(text);
            done();
          })
          .catch((e) => done(e));
      });
  });
});

    // Todo.find().count().then(
    //     count => {
    //       i = count
    //     },
    //     err => {
    //       console, log("Unable to fetch the data from Todos", err);
    //     }
    //   );