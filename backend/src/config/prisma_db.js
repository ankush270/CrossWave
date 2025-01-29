import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect(); // Explicitly connect to the database
    console.log('✅ Prisma is successfully connected to the database!');
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
  }
}

// Test the connection when the application starts
testConnection();

// Handle graceful shutdown
process.on('beforeExit', async () => {
  console.log('Disconnecting from database...');
  await prisma.$disconnect();
});

export default prisma;