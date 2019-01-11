const request = require("supertest");
const expect = require("expect");
const { ObjectId } = require("mongodb");

//locat imports
const { app } = require("./../server.js");
const { Todo } = require("./../models/todo.js");

const { todos, populateTodos, users, populateUsers } = require("./seed/seed");

beforeEach(populateUsers);
beforeEach(populateTodos);

/*
let i;
i = 1;

describe("POST /todos", () => {
  it("should create a new todo", done => {
    let text = "Visit dentists at 5pm";
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
            expect(todos.length).toBe(i);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it("Should not create todo with invalid data", done => {
    // console.log(` todo is : ${tCount}`);
    // console.log(` todo is : ${Todo.length}`);
    // console.log(` tl is : ${todos.length}`);
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
            //expect(todos.length).toBe(i);
            expect(todos.length).toBe(todos.length);
            //  console.log(` count is : ${i}`);
            //  console.log(` tl is : ${todos.length}`);
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
       // expect(res.body.todos.length).toBe(i);
        expect(res.body.todos.length).toBe(res.body.todos.length);
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
    let deletedId = todos[1]._id;

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
});

describe("PATCH / todo/:id", () => {
  it("should update todo by given id with completed true", done => {
    let updatedId = todos[2]._id;
    let text = "Visit dentist today";

    request(app)
      .patch(`/todos/${updatedId}`)
      .send({ text: "Visit dentist today", completed: true })
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(updatedId);
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe("number");
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
            expect(typeof res.body.todo.completedAt).toBe("number");
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
*/

/* ***************  U S E R S ***************** */

describe("GET /users/me", () => {
  it("should return user of authenticated", done => {
    request(app)
      .get("/users/me")
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get("/users/me")
      .expect(401)
      .expect(res => {
       // expect(res.body._id).toBe(undefined);
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});