import { PrismaClient } from "@/prisma/generated/client_next"

type GlobalPrisma = typeof globalThis & {
  prismaClient?: PrismaClient
  prismaSiapPromise?: Promise<void>
}

const globalPrisma = globalThis as GlobalPrisma

export const prisma =
  globalPrisma.prismaClient ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  globalPrisma.prismaClient = prisma
}

export async function pastikanPrismaSiap() {
  if (!globalPrisma.prismaSiapPromise) {
    globalPrisma.prismaSiapPromise = (async () => {
      await prisma.$connect()
    })().catch((error) => {
      globalPrisma.prismaSiapPromise = undefined
      throw error
    })
  }

  await globalPrisma.prismaSiapPromise
}
