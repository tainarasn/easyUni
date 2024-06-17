import React, { useEffect, useState } from "react"
import { Box, Pagination } from "@mui/material"
import { TitleUni } from "../../../../components/TitleUni"
import { colors } from "../../../../styles/colors"
import { CrudAtividade } from "../../../../components/Atividades/CrudAtividade"
import AtividadeCrudGrid from "../../../../components/Atividades/AtividadeCrudGrid"
import { Activity, ActivityForm } from "../../../../types/server/class/activity"
import { ActivityCard } from "../../../../components/admin/ActivityCard"
import { useSnackbar } from "burgos-snackbar"
import { useFormik } from "formik"
import { api } from "../../../../api"
import { IoMdAdd } from "react-icons/io"
import { ModalCreateActivity } from "../../../../components/student/ModalCreateActivity"
import { ModalUpdateActivity } from "../../../../components/student/ModalUpdateActivity"
import { User } from "../../../../types/server/class/user"
import { useUser } from "../../../../hooks/useUser"

interface AtividadesProps {}

export const Atividades: React.FC<AtividadesProps> = ({}) => {
    const [listAtividade, setListAtividades] = useState<Activity[]>([])
    const [open, setOpen] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [activity, setActivity] = useState<Activity | null>(null)
    const { snackbar } = useSnackbar()
    const { user } = useUser()

    const itemsPerPage = 7
    const [page, setPage] = useState(1)
    const noOfPages = Math.ceil(listAtividade.length / itemsPerPage)
    const handleChangePage = (event: any, value: any) => {
        setPage(value)
    }

    const formik = useFormik<ActivityForm>({
        initialValues: {
            name: "",
            totalHours: "",
            linkCertificate: "",
            studentId: user?.student?.id,
        },
        onSubmit: async (values, { resetForm }) => {
            const data = {
                ...values,
            }
            await handleSubmit(data) // Certifique-se de que handleSubmit seja uma função assíncrona que envie os dados
            fetchActivity()
            resetForm()
        },
        enableReinitialize: true,
    })

    const handleSubmit = async (values: ActivityForm) => {
        if (loading) return
        console.log({ AQUI: values })
        try {
            const response = (await api.post("/activity", values)) as Activity
            snackbar({ text: "Atividade adicionada!", severity: "success" })
            return response
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Tente novamente.", severity: "error" })
        }
    }

    const fetchActivity = async () => {
        try {
            const response = await api.get("/activity/all")
            setListAtividades(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchActivity()
        console.log()
    }, [])

    return (
        <Box sx={{ width: 1, height: 1, flexDirection: "column", gap: "0.8vw" }}>
            <TitleUni
                title="Atividades Complementares"
                button
                buttonTitle="Adicionar atividade"
                click={() => setOpen(true)}
                icon={<IoMdAdd />}
            />
            <Box sx={{ gap: "1vw" }}>
                <Box sx={{ width: 0.75, flexDirection: "column", gap: "1vw" }}>
                    {listAtividade
                        .sort((a, b) => b.id - a.id)
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map((activity, index) => (
                            <ActivityCard
                                key={index}
                                activity={activity}
                                setOpenUpdate={setOpenUpdate}
                                setActiviy={setActivity}
                            />
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
                <ModalCreateActivity open={open} setOpen={setOpen} formik={formik} loading={loading} />
                {activity && (
                    <ModalUpdateActivity
                        activity={activity}
                        setActivity={setActivity}
                        fetchActivity={fetchActivity}
                        open={openUpdate}
                        setOpen={setOpenUpdate}
                        setLoading={setLoading}
                    />
                )}
                {user && <CrudAtividade user={user} />}
            </Box>
        </Box>
    )
}
