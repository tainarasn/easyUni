import { Admin, Prisma, Student } from "@prisma/client"
import { WithoutFunctions } from "./helpers"
import { prisma } from "../prisma"
import { LoginForm } from "../types/shared/login"

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

//prisma table
export type UserPrisma = Prisma.UserGetPayload<{ include: typeof userInclusions }>

//front-end types
export type UserForm = Omit<WithoutFunctions<User>, "id">

//update user type
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
    isAdmin: boolean

    constructor(userPrisma?: UserPrisma): User
    static async signup(data: UserForm): Promise<User>
    load(data: UserPrisma): void
    static async login(data: LoginForm): Promise<
        | {
              id: number
              name: string
              image: string | null
              username: string
              email: string
              password: string
              isAdmin: boolean
          }
        | null
        | undefined
    >
}
