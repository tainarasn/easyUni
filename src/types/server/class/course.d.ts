import { Activity, Materia, Prisma, Student, Trail } from "@prisma/client"
import { WithoutFunctions } from "./helpers"
import { prisma } from "../prisma"

export declare const course_inclusions: {
    materias: { include: { prerequisites: true; requiredBy: true } }
    students: { include: { user: true } }
    trilhas: { include: { materias: true } }
}

export type CoursePrisma = Prisma.CourseGetPayload<{ include: typeof course_inclusions }>
export type CourseForm = Omit<WithoutFunctions<Course>, "id">
export type PartialCourse = Partial<Course> & { id: number }

export class Course {
    id: number
    name: string
    campus: string | ""
    totalPeriods: number
    totalHours: number
    totalHoursActivites: number
    matriz: number
    materias: Materia[]
    trilhas: Trail[]
    students: Student[]

    //init class
    constructor(coursePrisma?: CoursePrisma | PartialCourse): Course
    static async create(data: CourseForm): Promise<Course>
    static async updateCourse(data: PartialCourse): Promise<Course>
    static async list(): Promise<void>
    static async delete(id: number): Promise<Course>
}
