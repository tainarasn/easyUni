import React, { useEffect, useState } from "react"
import { Box, Chip, Grid, Pagination } from "@mui/material"
import { TitleUni } from "../../../../components/TitleUni"
import { useHorizontalScroll } from "../../../../hooks/useHorizontalScroll"
import { useFormik } from "formik"
import { ModalCreateMateria } from "../../../../components/admin/ModalCreateMateria"
import { api } from "../../../../api"
import { useSnackbar } from "burgos-snackbar"
import { MateriaCard } from "../../../../components/admin/MateriaCard"
import { IoMdAdd } from "react-icons/io"
import { ModalUpdateMateria } from "../../../../components/admin/ModalUpdateMateria"
import { Course, CourseForm } from "../../../../types/server/class/course"
import { CourseCard } from "../../../../components/admin/CourseCard"
import { ModalCreateCourse } from "../../../../components/admin/ModalCreateCourse"
import { ModalUpdateCourse } from "../../../../components/admin/ModalUpdateCourse"

interface CoursesProps {}

export const Courses: React.FC<CoursesProps> = ({}) => {
    const { snackbar } = useSnackbar()
    const [open, setOpen] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [listCourses, setListCourses] = useState<Course[]>([])
    const [course, setCourse] = useState<Course | null>(null)

    const scrollRef = useHorizontalScroll()

    const itemsPerPage = 6
    const [page, setPage] = useState(1)
    const noOfPages = Math.ceil(listCourses.length / itemsPerPage)
    const handleChangePage = (event: any, value: any) => {
        setPage(value)
    }

    const formik = useFormik<CourseForm>({
        initialValues: {
            name: "",
            campus: "",
            matriz: 0,
            totalHoursActivites: 0,
            totalHours: 0,
            totalPeriods: 1,
            materias: [],
            trilhas: [],
            students: [],
        },
        onSubmit: async (values, { resetForm }) => {
            setLoading(true)
            const data = {
                ...values,
                matriz: Number(values.matriz),
                totalPeriods: Number(values.totalPeriods),
                totalHours: Number(values.totalHours),
                totalHoursActivites: Number(values.totalHoursActivites),
            }
            await handleSubmit(data)
            fetchCourses()
            resetForm()
        },
        enableReinitialize: true,
    })

    const handleSubmit = async (values: CourseForm) => {
        if (loading) return
        try {
            console.log({ AQUI: values })
            const response = (await api.post("/course", values)) as Course
            snackbar({ text: "Novo curso adicionado!", severity: "success" })
            setLoading(false)
            return response
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Tente novamente.", severity: "error" })
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
        fetchCourses()
        console.log(listCourses)
    }, [])

    return (
        <Box sx={{ width: 1, height: 1, flexDirection: "column", gap: "0.8vw", borderRadius: 0 }}>
            <TitleUni
                title="Cursos"
                button
                buttonTitle="Adicionar Curso"
                click={() => {
                    setOpen(true)
                }}
                icon={<IoMdAdd />}
            />
            <Box
                ref={scrollRef}
                sx={{
                    width: 1,
                    height: 1,
                    flexDirection: "column",
                    gap: "0.7vw",
                }}
            >
                <Grid container spacing={4}>
                    {listCourses
                        .sort((a, b) => b.id - a.id)
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map((course, i) => (
                            <Grid item xs={5.9} key={i}>
                                <CourseCard
                                    course={course}
                                    setOpenUpdate={setOpenUpdate}
                                    setCourse={setCourse}
                                    fetchCourses={fetchCourses}
                                />
                            </Grid>
                        ))}
                </Grid>
                <Pagination
                    count={noOfPages}
                    onChange={handleChangePage}
                    color="primary"
                    variant="outlined"
                    page={page}
                    sx={{ mt: 2, alignSelf: "center" }}
                />
                <ModalCreateCourse open={open} setOpen={setOpen} formik={formik} loading={loading} />
                {course && (
                    <ModalUpdateCourse
                        loading={loading}
                        course={course}
                        setCourse={setCourse}
                        open={openUpdate}
                        setOpen={setOpenUpdate}
                        fetchCourses={fetchCourses}
                        setLoading={setLoading}
                    />
                )}
            </Box>
        </Box>
    )
}
