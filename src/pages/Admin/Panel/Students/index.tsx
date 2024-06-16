import React, { useEffect, useState } from "react"
import { Box, Pagination } from "@mui/material"
import { TitleUni } from "../../../../components/TitleUni"
import { useHorizontalScroll } from "../../../../hooks/useHorizontalScroll"
import { Materia, MateriaForm } from "../../../../types/server/class/materia"
import { useFormik } from "formik"
import { ModalCreateMateria } from "../../../../components/admin/ModalCreateMateria"
import { api } from "../../../../api"
import { useSnackbar } from "burgos-snackbar"
import { MateriaCard } from "../../../../components/admin/MateriaCard"
import { IoMdAdd } from "react-icons/io"
import { ModalUpdateMateria } from "../../../../components/admin/ModalUpdateMateria"
import { Course } from "../../../../types/server/class/course"
import { User } from "../../../../types/server/class/user"
import { UserCard } from "../../../../components/admin/UserCard"

interface StudentsProps {}

export const Students: React.FC<StudentsProps> = ({}) => {
    const { snackbar } = useSnackbar()
    const [open, setOpen] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [loading, setLoading] = useState(false)

    const [listUsers, setUsers] = useState<User[]>([])

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

    useEffect(() => {
        fetchUsers()
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
                {listUsers
                    .sort((a, b) => b.id - a.id)
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((user, i) => (
                        <UserCard key={i} user={user} />
                    ))}
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
