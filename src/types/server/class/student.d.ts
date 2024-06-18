import { Prisma } from "@prisma/client"
import { Course } from "./course"

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
export type StudentForm = Omit<WithoutFunctions<Student>, "id">
export type PartialStudent = Partial<Student> & { id: number }

export class Student {
    id: number
    period: number
    course?: Course
    courseId: number
    materias: Materia[]

    constructor(userPrisma?: UserPrisma)
    static async signup(data: UserForm): Promise<User>
    load(data: UserPrisma): void
}
