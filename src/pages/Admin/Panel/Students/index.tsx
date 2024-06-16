import React, { useEffect, useState } from "react"
import { Box, Chip, Pagination } from "@mui/material"
import { TitleUni } from "../../../../components/TitleUni"
import { useHorizontalScroll } from "../../../../hooks/useHorizontalScroll"
import { api } from "../../../../api"
import { useSnackbar } from "burgos-snackbar"
import { User } from "../../../../types/server/class/user"
import { UserCard } from "../../../../components/admin/UserCard"
import { Course } from "../../../../types/server/class/course"
import { colors } from "../../../../styles/colors"

interface StudentsProps {}

export const Students: React.FC<StudentsProps> = ({}) => {
    const { snackbar } = useSnackbar()

    const [listUsers, setUsers] = useState<User[]>([])
    const [listCourses, setListCourses] = useState<Course[]>([])
    const [value, setValue] = useState("")

    const scrollRef = useHorizontalScroll()

    const itemsPerPage = 10
    const [page, setPage] = useState(1)
    const noOfPages = Math.ceil(listUsers.length / itemsPerPage)
    const handleChangePage = (event: any, value: any) => {
        setPage(value)
    }

    const fetchUsers = async () => {
        try {
            const response = await api.get("/user/all")
            console.log(response)
            setUsers(response.data)
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Recarregue a página.", severity: "error" })
        }
    }
    const fetchCourses = async () => {
        try {
            const response = await api.get("/course/all")
            console.log(response)
            setListCourses(response.data)
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Recarregue a página.", severity: "error" })
        }
    }

    useEffect(() => {
        fetchUsers()
        fetchCourses()
    }, [])

    return (
        <Box sx={{ width: 1, height: 1, flexDirection: "column", gap: "0.8vw", borderRadius: 0 }}>
            <TitleUni title="Estudantes" />
            <Box
                ref={scrollRef}
                sx={{
                    width: 1,
                    flexDirection: "column",
                    gap: "0.7vw",
                }}
            >
                <Box sx={{ flexDirection: "row", gap: "0.5vw" }}>
                    <Chip
                        label={"Todos"}
                        sx={{ bgcolor: colors.yellow, fontSize: "0.9rem" }}
                        onClick={() => {
                            setValue("")
                        }}
                    />
                    {listCourses
                        .sort((a, b) => b.id - a.id)
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map((course, i) => (
                            <Chip
                                key={i}
                                label={course.name}
                                sx={{ bgcolor: colors.yellow, fontSize: "0.9rem" }}
                                onClick={() => {
                                    setValue(course.name)
                                }}
                            />
                        ))}
                </Box>

                {value
                    ? listUsers
                          .filter((item) => item.student?.course.name === value)
                          .sort((a, b) => b.id - a.id)
                          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                          .map((user, i) => <UserCard key={i} user={user} />)
                    : listUsers
                          .filter((item) => item.student)
                          .sort((a, b) => b.id - a.id)
                          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                          .map((user, index) => <UserCard key={index} user={user} />)}

                <Pagination
                    count={noOfPages}
                    onChange={handleChangePage}
                    color="primary"
                    variant="outlined"
                    page={page}
                    sx={{ mt: 2, alignSelf: "center" }}
                />
            </Box>
        </Box>
    )
}
