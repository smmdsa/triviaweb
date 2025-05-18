import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create one company with demo data
  const company = await prisma.company.upsert({
    where: { name: 'Demo Corp' },
    update: {},
    create: {
      name: 'Demo Corp',
      users: {
        create: {
          email: 'admin@demo.com',
          name: 'Admin',
        },
      },
      trivias: {
        create: {
          title: 'General Knowledge',
          status: 'published',
          questions: {
            create: [
              {
                text: 'What is the capital of France?',
                options: ['Paris', 'London', 'Rome', 'Berlin'],
                answer: 'Paris',
                order: 1,
              },
              {
                text: '2 + 2 = ?',
                options: ['3', '4', '5', '22'],
                answer: '4',
                order: 2,
              },
            ],
          },
        },
      },
    },
  })

  console.log(`Seeded company with id: ${company.id}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })