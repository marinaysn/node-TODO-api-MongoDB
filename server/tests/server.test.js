const request = require("supertest");
const expect = require("expect");

//locat imports
const { app } = require("./../server.js");
const { Todo } = require("./../models/todo.js");
let i;


const todos = [{
    text: 'First todo'
}, {
    text: 'Second todo'
    }]

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
      let text = "Update the list";
      let completed = true

    request(app)
      .post("/todos")
      .send({ text, completed })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text})
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
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

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(i);
                 
            })
            .end(done);
    })
})

// Todo.find().count().then(
//     count => {
//       i = count
//     },
//     err => {
//       console, log("Unable to fetch the data from Todos", err);
//     }
//   );
