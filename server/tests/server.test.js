const request = require("supertest");
const expect = require("expect");
const { ObjectId } = require("mongodb");

//locat imports
const { app } = require("./../server.js");
const { Todo } = require("./../models/todo.js");
let i;

const todos = [
  {
    _id: '5c1c74a04591e107f04fade1',
    text: "Visit dentist at noon"
  },
  {
    _id: '5c265d0d1df2354b986869e2',
    text: "Cahnge the oil in the car"
  },
  {
    _id: new ObjectId(),
    text: "Second todo"
  }
];

beforeEach(done => {
  //Todo.remove({}).then(() => done());
  Todo.count()
    .then(count => {
      i = count;
     // console.log(` count is : ${i}`);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("should create a new todo", done => {
    let text = "Cahnge the oil in the car";
    let completed = false;

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
        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it("Should not create todo with invalid data", done => {
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

describe("GET /todos", () => {
  it("should get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(i);
      })
      .end(done);
  });
});

describe("GET /todos/:id", () => {
  it("should return valid info for valid id", (done) => {
    request(app)
      .get(`/todos/${todos[0]._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 400 if todo is not valid', (done) => {

    let newId = new ObjectId();
    request(app)
      .get(`/todos/${newId}11`)
      .expect(400)
    .end(done)
  });

  it('should return 404 if todo is not found', (done) => {

    let newId = new ObjectId();
    request(app)
      .get(`/todos/${newId}`)
      .expect(404)
    .end(done)
  });

});


