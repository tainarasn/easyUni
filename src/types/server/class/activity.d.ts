import { Prisma, Student } from "@prisma/client"
import { WithoutFunctions } from "./helpers"
import { prisma } from "../prisma"

export const activity_inclusions: {
    student: true
}

export type ActivityPrisma = Prisma.ActivityGetPayload<{ include: typeof activity_inclusions }>
export type ActivityForm = Omit<WithoutFunctions<Activity>, "id"> & { studentId?: number }
export type PartialActivity = Partial<Activity> & { id: number }

export class Activity {
    id: number
    name: string
    totalHours: string
    linkCertificate?: string
    studentId: number
    student: Student | null

    constructor(activityPrisma?: ActivityPrisma | PartialActivity): Activity

    static async create(data: ActivityForm): Promise<Activity>

    static async update(data: PartialActivity): Promise<Activity>

    static async list(): Promise<void>

    static async delete(id: number): Promise<void>
}
