const request = require("supertest");
const expect = require("expect");

//locat imports
const { app } = require("./../server.js");
const { Todo } = require("./../models/todo.js");
let i;

beforeEach(done => {
  //Todo.remove({}).then(() => done());
  Todo.count()
    .then(count => {
      i = count;
      console.log(` count is : ${i}`);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("should create a new todo", done => {
    let text = "Wash everything";

    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(i + 1);
            expect(todos[i].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it("Should not create todo with invalid data", (done) => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find()
          .then(todos => {
              expect(todos.length).toBe(i);
              console.log(` count is : ${i}`);
              console.log(` tl is : ${todos.length}`);
            done();
          })
          .catch(e => done(e));
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
