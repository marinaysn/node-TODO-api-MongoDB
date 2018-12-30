const request = require("supertest");
const expect = require("expect");
const { ObjectId } = require("mongodb");

//locat imports
const { app } = require("./../server.js");
const { Todo } = require("./../models/todo.js");
let i;

const todos = [
  {
    _id: "5c283e6a93265b20a45bbed1",
    text: "Visit dentist at 12"
  },
  {
    _id: "5c265bffcee9094a90868c10",
    text: "Update the list for Danny"
  },
  {
    _id: "5c1b3f3f7768893e1025a319",
    text: "Visit dentist today",
    completed: true,
    completedAt: 333
  },
  {
    _id: "5c1c77b968289803b0418234",
    text: "Wash dishes please",
    completed: false,
    completedAt: null
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
    let text = "Visit dentist at 11";
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
            // console.log(` count is : ${i}`);
            // console.log(` tl is : ${todos.length}`);
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
  it("should return valid info for valid id", done => {
    request(app)
      .get(`/todos/${todos[1]._id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[1].text);
      })
      .end(done);
  });

  it("should return 400 if todo is not valid", done => {
    let newId = new ObjectId();
    request(app)
      .get(`/todos/${newId}11`)
      .expect(400)
      .end(done);
  });

  it("should return 404 if todo is not found", done => {
    let newId = new ObjectId();
    request(app)
      .get(`/todos/${newId}`)
      .expect(404)
      .end(done);
  });
});

describe("DELETE /todos/:id", () => {
  it("should delete todo by given id", done => {
    let deletedId = todos[0]._id;

    request(app)
      .delete(`/todos/${deletedId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(deletedId);
      })
      // .end (done);
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(deletedId)
          .then(todo => {
            //expect(todo).toNotExist();
            expect(todo).not.toBeTruthy();
            done();
          })
          .catch(e => done(e));
      });
  });

  it("should return 406 if todo not found", done => {
    let newId = new ObjectId();
    request(app)
      .delete(`/todos/${newId}`)
      .expect(406)
      .end(done);
  });

  it("should return 400 if todo not valid", done => {
    let newId = new ObjectId();
    request(app)
      .delete(`/todos/${newId}11`)
      .expect(400)
      .end(done);
  });

  describe("PATCH / todo/:id", () => {
    it("should update todo by given id with completed true", done => {
      let updatedId = todos[2]._id;
       let text = "Visit dentist today"

      request(app)
        .patch(`/todos/${updatedId}`)
        .send({ text: "Visit dentist today", completed: true })
        .expect(200)
        .expect(res => {
          expect(res.body.todo._id).toBe(updatedId);
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(true);
          expect( typeof res.body.todo.completedAt).toBe('number');
        })
        //.end(done)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.findById(updatedId)
            .then(todo => {
              expect(todos[2].text).toBe(res.body.todo.text);
              expect(todos[2].completed).toBe(res.body.todo.completed);
              expect( typeof res.body.todo.completedAt).toBe('number');
              done();
            })
            .catch(e => done(e));
        });
    });


    it("should return 404 if id of updated todo is not found", done => {
      let newId = new ObjectId();
      request(app)
        .patch(`/todos/${newId}`)
        .expect(404)
        .end(done);
    });

    it("should return 400 if id of updated todo is not valid", done => {
      let newId = new ObjectId();
      request(app)
        .patch(`/todos/${newId}11`)
        .expect(400)
        .end(done);
    });

    it("should update todo by given id with completed false", done => {
      let updatedId = todos[3]._id;

      request(app)
        .patch(`/todos/${updatedId}`)
        .send({ text: "Wash dishes please", completed: false })
        .expect(200)
        .expect(res => {
          expect(res.body.todo._id).toBe(updatedId);
        })
        //.end(done)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.findById(updatedId)
            .then(todo => {
              expect(todos[3].text).toBe(res.body.todo.text);
              expect(todos[3].completed).toBe(res.body.todo.completed);
              expect(res.body.todo.completedAt).toBe(null);
              done();
            })
            .catch(e => done(e));
        });
    });

  });
});
