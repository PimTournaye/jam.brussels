import prisma from "$lib/database/client";

export async function getAllPublicJamSessions() {
  return await prisma.jamSession.findMany({
    where: { public: true },
    orderBy: { date: "asc" },
  });
}

export async function getPublicJamSessions(){
    const jamSessions = await prisma.jamSession.findMany({
        where: {
            date: {
                gte: new Date()
            }
        },
        orderBy: {
            date: 'asc'
        }
    });
    return jamSessions; 
}

export async function getJamSessionById(id: number) {
  return await prisma.jamSession.findUnique({
    where: {
      id: id,
    },
  });
}
 
export async function createJamSession(data: any) {
  return await prisma.jamSession.create({
    data: data,
  });
}

export async function updateJamSession(id: number, data: any) {
  return await prisma.jamSession.update({
    where: {
      id: id,
    },
    data: data,
  });
}

export async function deleteJamSession(id: number) {
  return await prisma.jamSession.delete({
    where: {
      id: id,
    },
  });
}

export async function publishJamSession(id: number) {
  return await prisma.jamSession.update({
    where: {
      id: id,
    },
    data: {
      public: true,
    },
  });
}
