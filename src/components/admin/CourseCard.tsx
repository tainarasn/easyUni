import React, { useState } from "react"
import { Box, Chip, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import { colors } from "../../styles/colors"
import { Course } from "../../types/server/class/course"
import { BsThreeDotsVertical } from "react-icons/bs"
import { ModalUpdateCourse } from "./ModalUpdateCourse"
import { api } from "../../api"
import { useSnackbar } from "burgos-snackbar"
import { ModalDelete } from "./ModalDelete"

interface CourseCardProps {
    course: Course
    setOpenUpdate?: React.Dispatch<React.SetStateAction<boolean>>
    setCourse?: React.Dispatch<React.SetStateAction<Course | null>>
    fetchCourses?: () => Promise<void>
    student?: boolean
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, setOpenUpdate, setCourse, fetchCourses, student }) => {
    const { snackbar } = useSnackbar()
    const [openDelete, setOpenDelete] = useState(false)
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDelete = async () => {
        try {
            const response = await api.get(`/course/delete?id=${Number(course.id)}`)
            snackbar({ text: "Curso deletado!", severity: "success" })
            fetchCourses && fetchCourses()
            setOpenDelete(false)
            return response
        } catch (error) {
            console.log(error)
            snackbar({ text: "Algo deu errado! Tente novamente.", severity: "error" })
        }
    }
    return (
        <Box
            sx={{
                width: 1,
                height: student ? "10vw" : "8vw",
                // p: "0.85vw",
                borderRadius: "0.5vw",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
            }}
            onClick={() => {
                // setOpen(true)
            }}
        >
            <Box
                sx={{
                    bgcolor: colors.yellow,
                    fontWeight: "Bold",
                    height: student ? "10vw" : "8vw",

                    width: "5vw",
                    borderRadius: "0.5vw 0 0 0.5vw",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                }}
            >
                {course.campus}
            </Box>
            <Box
                sx={{
                    p: "0.85vw",
                    width: 1,
                    justifyContent: "space-between",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <h3
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setOpen(true)
                            setCourse && setCourse(course)
                        }}
                    >
                        {course.name}
                    </h3>
                    <Box sx={{ alignItems: "center" }}>
                        <Chip label={course.matriz} sx={{ bgcolor: colors.yellow, fontSize: "0.9rem" }} />
                        {!student && (
                            <IconButton onClick={handleClick}>
                                <BsThreeDotsVertical />
                            </IconButton>
                        )}
                    </Box>
                </Box>
                <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                    <p>Campus {course.campus}</p>
                    <Box sx={{ gap: "0.5vw" }}>
                        <Chip
                            label={`${course.totalPeriods}° períodos`}
                            sx={{ width: "fit-content", bgcolor: colors.terciary, fontSize: "0.9rem" }}
                        />
                        <Chip
                            label={`${course.totalHours}h `}
                            sx={{ width: "fit-content", bgcolor: colors.terciary, fontSize: "0.9rem" }}
                        />
                        <Chip
                            label={`${course.totalHoursActivites}h de extensão`}
                            sx={{ width: "fit-content", bgcolor: colors.terciary, fontSize: "0.9rem" }}
                        />
                        <Chip
                            label={`${course.totalHoursActivites} alunos`}
                            sx={{ width: "fit-content", bgcolor: colors.terciary, fontSize: "0.9rem" }}
                        />
                    </Box>
                </Box>
                {!student && (
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                setCourse && setCourse(course)
                                setOpenUpdate && setOpenUpdate(true)
                                handleClose()
                            }}
                        >
                            Editar
                        </MenuItem>
                        <MenuItem onClick={() => setOpenDelete(true)}>Deletar</MenuItem>
                    </Menu>
                )}
                <ModalDelete
                    click={() => {
                        handleDelete()
                        handleClose()
                    }}
                    open={openDelete}
                    setOpen={setOpenDelete}
                />
            </Box>
        </Box>
    )
}
