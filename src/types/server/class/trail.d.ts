import { Prisma, Materia } from "@prisma/client"
import { WithoutFunctions } from "./helpers"
import { prisma } from "../prisma"
import { Course } from "./Course"
import { MateriaForm } from "./materia"

export declare const trail_inclusions: {
    materias: true
    course: true
}

export type TrailPrisma = Prisma.TrailGetPayload<{ include: typeof trail_inclusions }>
export type TrailForm = Omit<WithoutFunctions<Trail>, "id">
export type PartialTrail = Partial<Trail> & { id: number }

export class Trail {
    id: number
    code: string
    name: string | null
    materias: Materia[]
    course: Course | null
    courseId: number | null

    constructor(trailPrisma?: TrailPrisma | PartialTrail): Trail
    static async create(data: TrailForm): Promise<Trail>
    static async update(data: PartialTrail): Promise<Trail>
    static async list(): Promise<void>
    static async delete(id: number): Promise<void>
}
