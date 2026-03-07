import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function test() {
  try {
    const orders = await prisma.order.findMany({
      where: { businessId: 1 },
      include: { items: true, user: true },
      take: 10,
    });
    console.log("✅ Successfully fetched orders:", orders.length);
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to fetch orders:", err);
    process.exit(1);
  }
}

test();
