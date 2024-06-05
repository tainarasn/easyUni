import { Prisma } from "@prisma/client"

export declare const userInclusions: {
    student: {
        include: {
            user: true
            atividades: true
            course: { include: { materias: true; students: true; trilhas: true } }
        }
    }
    admin: { include: { user: true } }
}
export type UserPrisma = Prisma.UserGetPayload<{ include: typeof userInclusions }>
export type UserForm = Omit<WithoutFunctions<User>, "id">
export type PartialUser = Partial<User> & { id: number }

export class User {
    id: number
    name: string
    email: string
    image: string | null
    username: string
    password: string
    student: Student | null
    admin: Admin | null

    constructor(userPrisma?: UserPrisma)
    static async signup(data: UserForm): Promise<User>
    load(data: UserPrisma): void
}
