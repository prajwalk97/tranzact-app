import {PrismaClient} from "@prisma/client"

const initPrisma = () => {
    return new PrismaClient();
}

declare global{
    var prismaGlobal:undefined | ReturnType<typeof initPrisma >
}

const prisma = globalThis.prismaGlobal ?? initPrisma();

export default prisma;

if(process.env.NODE_ENV != 'production') globalThis.prismaGlobal = prisma