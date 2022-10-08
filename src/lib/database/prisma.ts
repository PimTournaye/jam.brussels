import prisma from "./db-client";

export async function getPublicJamSessions() {
  return await prisma.jamSession.findMany({
    where: {
      public: true,
    },
  });
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