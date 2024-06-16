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
import { Trail, TrailForm } from "../../../../types/server/class/trail"
import { ModalCreateTrail } from "../../../../components/admin/ModalCreateTrail"
import { TrailCard } from "../../../../components/admin/TrailCard"
import { ModalUpdateTrail } from "../../../../components/admin/ModalUpdateTrail"

interface TrailsProps {}

export const Trails: React.FC<TrailsProps> = ({}) => {
    const { snackbar } = useSnackbar()
    const [open, setOpen] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [listTrails, setListTrails] = useState<Trail[]>([])
    const [listMaterias, setListMaterias] = useState<Materia[]>([])
    const [listCourses, setListCourses] = useState<Course[]>([])
    const [trail, setTrail] = useState<Trail | null>(null)

    const scrollRef = useHorizontalScroll()

    const itemsPerPage = 7
    const [page, setPage] = useState(1)
    const noOfPages = Math.ceil(listTrails.length / itemsPerPage)
    const handleChangePage = (event: any, value: any) => {
        setPage(value)
    }

    const formik = useFormik<TrailForm>({
        initialValues: {
            code: "",
            name: "",
            course: null,
            courseId: undefined,
            materias: [],
        },
        onSubmit: async (values, { resetForm }) => {
            const data = {
                ...values,
            }
            console.log(values)
            await handleSubmit(data) // Certifique-se de que handleSubmit seja uma função assíncrona que envie os dados
            fetchTrails()
            resetForm()
        },
        enableReinitialize: true,
    })

    const handleSubmit = async (values: TrailForm) => {
        if (loading) return
        try {
            console.log({ AQUI: values })
            const response = (await api.post("/trail", values)) as Trail
            snackbar({ text: "Trilha adicionada!", severity: "success" })
            return response
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Tente novamente.", severity: "error" })
        }
    }

    const fetchTrails = async () => {
        try {
            const response = await api.get("/trail/all")
            setListTrails(response.data)
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Recarregue a página.", severity: "error" })
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
        fetchTrails()
        console.log(listMaterias)
    }, [])

    return (
        <Box sx={{ width: 1, height: 1, flexDirection: "column", gap: "0.8vw", borderRadius: 0 }}>
            <TitleUni
                title="Trilhas"
                button
                buttonTitle="Adicionar Trilha"
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
                {listTrails
                    .sort((a, b) => b.id - a.id)
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((trail, index) => (
                        <TrailCard key={index} trail={trail} setOpenUpdate={setOpenUpdate} setTrail={setTrail} />
                    ))}
                <Pagination
                    count={noOfPages}
                    onChange={handleChangePage}
                    color="primary"
                    variant="outlined"
                    page={page}
                    sx={{ mt: 2, alignSelf: "center" }}
                />
                <ModalCreateTrail
                    trilhas={listTrails}
                    open={open}
                    setOpen={setOpen}
                    formik={formik}
                    materias={listMaterias}
                    courses={listCourses}
                />
                {trail && (
                    <ModalUpdateTrail
                        open={openUpdate}
                        setOpen={setOpenUpdate}
                        trail={trail}
                        fetchTrails={fetchTrails}
                        setTrail={setTrail}
                        fetchCourses={fetchCourses}
                        loading={loading}
                        setLoading={setLoading}
                        courses={listCourses}
                        materias={listMaterias}
                    />
                )}
            </Box>
        </Box>
    )
}
