declare interface User {
    id: number
    name: string
    email: string
    image: string | null
    username: string
    password: string
    student: Student | null
    admin: Admin | null
}
