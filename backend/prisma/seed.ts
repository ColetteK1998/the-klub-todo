import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.todo.createMany({
    data: [
      { title: 'Make the bed', completed: false },
      { title: 'Wash the dishes', completed: false },
      { title: 'Take out the bins', completed: false },
      { title: 'Hang up the washing', completed: false },
    ],
  })
  console.log('Todos successfully added to the database!')
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
