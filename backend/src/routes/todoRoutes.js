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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const todoController_1 = require('../controllers/todoController')
const router = express_1.default.Router()
router.get('/todos', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const todos = yield (0, todoController_1.getAllTodos)()
      res.json(todos)
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch todo list' })
    }
  }),
)
router.put('/todos/:id', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const id = parseInt(req.params.id, 10)
      const { title, completed } = req.body
      const updatedTodo = yield (0, todoController_1.updateTodo)(id, {
        title,
        completed,
      })
      res.json(updatedTodo)
    } catch (error) {
      res.status(500).json({ error: `Failed to update todo with id ${req.params.id}` })
    }
  }),
)
router.post('/todos', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { title } = req.body
      const newTodo = yield (0, todoController_1.createTodo)({ title })
      res.json(newTodo)
    } catch (error) {
      res.status(500).json({ error: `Failed to create todo` })
    }
  }),
)
router.delete('/todos/:id', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const id = parseInt(req.params.id, 10)
      const deletedTodo = yield (0, todoController_1.deleteTodo)(id)
      res.json(deletedTodo)
    } catch (error) {
      res.status(500).json({ error: `Failed to delete todo with id ${req.params.id}` })
    }
  }),
)
exports.default = router
