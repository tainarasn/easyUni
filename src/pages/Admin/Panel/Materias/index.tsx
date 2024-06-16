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

interface MateriasProps {}

export const Materias: React.FC<MateriasProps> = ({}) => {
    const { snackbar } = useSnackbar()
    const [open, setOpen] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [listMaterias, setListMaterias] = useState<Materia[]>([])
    const [listCourses, setListCourses] = useState<Course[]>([])
    const [materia, setMateria] = useState<Materia | null>(null)

    const scrollRef = useHorizontalScroll()

    const itemsPerPage = 7
    const [page, setPage] = useState(1)
    const noOfPages = Math.ceil(listMaterias.length / itemsPerPage)
    const handleChangePage = (event: any, value: any) => {
        setPage(value)
    }

    const formik = useFormik<MateriaForm>({
        initialValues: {
            name: "",
            code: "",
            totalHours: 0,
            period: 1,
            periodRequire: 0,
            prerequisites: [],
            requiredBy: [],
            course: null,
            courseId: null,
            trilha: null,
            student: null,
        },
        onSubmit: async (values, { resetForm }) => {
            const data = {
                ...values,
                period: Number(values.period),
                periodRequire: Number(values.periodRequire),
                totalHours: Number(values.totalHours),
            }
            await handleSubmit(data) // Certifique-se de que handleSubmit seja uma função assíncrona que envie os dados
            fetchMaterias()
            resetForm()
        },
        enableReinitialize: true,
    })

    const handleSubmit = async (values: MateriaForm) => {
        if (loading) return
        try {
            console.log({ AQUI: values })
            const response = (await api.post("/materia", values)) as Materia
            snackbar({ text: "Matéria adicionada!", severity: "success" })
            return response
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Tente novamente.", severity: "error" })
        }
    }

    const fetchMaterias = async () => {
        try {
            const response = await api.get("/materia/all")
            setListMaterias(response.data)
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Recarregue a página.", severity: "error" })
        }
    }

    const fetchCourses = async () => {
        try {
            const response = await api.get("/course/all")
            setListCourses(response.data)
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Recarregue a página.", severity: "error" })
        }
    }

    useEffect(() => {
        fetchMaterias()
        fetchCourses()
        console.log(listMaterias)
    }, [])

    return (
        <Box sx={{ width: 1, height: 1, flexDirection: "column", gap: "0.8vw", borderRadius: 0 }}>
            <TitleUni
                title="Disciplinas"
                button
                buttonTitle="Adicionar Matéria"
                click={() => {
                    setOpen(true)
                }}
                icon={<IoMdAdd />}
            />
            <Box
                ref={scrollRef}
                sx={{
                    width: 1,
                    flexDirection: "column",
                    gap: "0.7vw",
                }}
            >
                {listMaterias
                    .sort((a, b) => b.id - a.id)
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((materia, i) => (
                        <MateriaCard key={i} materia={materia} setOpenUpdate={setOpenUpdate} setMateria={setMateria} />
                    ))}
                <Pagination
                    count={noOfPages}
                    onChange={handleChangePage}
                    color="primary"
                    variant="outlined"
                    page={page}
                    sx={{ mt: 2, alignSelf: "center" }}
                />
                <ModalCreateMateria
                    open={open}
                    setOpen={setOpen}
                    formik={formik}
                    materias={listMaterias}
                    courses={listCourses}
                />
                {materia && (
                    <ModalUpdateMateria
                        materia={materia}
                        open={openUpdate}
                        setOpen={setOpenUpdate}
                        materias={listMaterias}
                        fetchMaterias={fetchMaterias}
                        courses={listCourses}
                    />
                )}
            </Box>
        </Box>
    )
}
