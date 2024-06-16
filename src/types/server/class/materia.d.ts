import { Prisma, Course, Trail, Student } from "@prisma/client"
import { prisma } from "../prisma"

export declare const materia_inclusions: {
    prerequisites: true
    requiredBy: true
    course: true
    trilha: true
    student: true
}

export type MateriaPrisma = Prisma.MateriaGetPayload<{ include: typeof materia_inclusions }>
export type MateriaForm = Omit<Materia, "id">
export type PartialMateria = Partial<Materia> & { id: number }

export class Materia {
    id: number
    code: string
    name: string
    totalHours: number
    period: number
    periodRequire: number | null
    prerequisites: Materia[]
    requiredBy: Materia[]
    course: Course | null
    trilha: Trail
    student: Student | null

    constructor(materiaPrisma?: MateriaPrisma): Materia
    static async create(data: MateriaForm): Promise<Materia>
    static async updateMateria(data: PartialMateria): Promise<Materia>
}
