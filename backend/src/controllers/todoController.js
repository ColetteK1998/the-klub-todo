'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.deleteTodo = exports.createTodo = exports.updateTodo = exports.getAllTodos = void 0
const client_1 = require('@prisma/client')
const prismaClient = new client_1.PrismaClient()
// Get all todos
const getAllTodos = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient.todo.findMany()
  })
exports.getAllTodos = getAllTodos
// Update a todo
const updateTodo = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient.todo.update({
      where: { id },
      data,
    })
  })
exports.updateTodo = updateTodo
// Create a todo
const createTodo = (data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a
    const todoObj = {
      title: (_a = data.title) !== null && _a !== void 0 ? _a : '',
      createdAt: new Date(),
      completed: false,
    }
    return yield prismaClient.todo.create({ data: todoObj })
  })
exports.createTodo = createTodo
// Delete a todo by ID
const deleteTodo = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient.todo.delete({
      where: { id },
    })
  })
exports.deleteTodo = deleteTodo
