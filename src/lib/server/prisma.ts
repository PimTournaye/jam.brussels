import { Prisma, PrismaClient } from '@prisma/client'
// import { PrismaClient } from '@prisma/client/edge'
export const prisma = new PrismaClient()

export async function addJamSession(data: Prisma.JamSessionCreateInput) {
  const { date, startTime, endTime, location, title, openingBand, description, image, author } = data
  const jamSession = await prisma.jamSession.create({
    data: {
      date,
      startTime,
      endTime,
      location,
      title,
      openingBand,
      description,
      image,
      author
    },
  });
  return jamSession
}