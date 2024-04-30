import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import { FiEdit3 } from "react-icons/fi"
import { AiOutlineDelete } from "react-icons/ai"
import { IoCheckmarkOutline } from "react-icons/io5"
import { IoCloseOutline } from "react-icons/io5"
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridSlots,
} from "@mui/x-data-grid"
import { randomCreatedDate, randomTraderName, randomId, randomArrayItem } from "@mui/x-data-grid-generator"
import { colors } from "../../styles/colors"

const roles = ["Social", "Cultural", "Técnico-Científico"]
const randomRole = () => {
    return randomArrayItem(roles)
}

const initialRows: GridRowsProp = [
    {
        id: randomId(),
        name: randomTraderName(),
        age: 25,
        initDate: randomCreatedDate(),
        finishDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 36,
        initDate: randomCreatedDate(),
        finishDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 19,
        initDate: randomCreatedDate(),
        finishDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 28,
        initDate: randomCreatedDate(),
        finishDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 23,
        initDate: randomCreatedDate(),
        finishDate: randomCreatedDate(),
        role: randomRole(),
    },
]

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void
    setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void
}

function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props

    const handleClick = () => {
        const id = randomId()
        setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }])
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
        }))
    }

    return (
        <GridToolbarContainer>
            <Button
                sx={{ bgcolor: colors.yellow, textTransform: "inherit", borderRadius: "1vw", alignSelf: "end" }}
                startIcon={<AddIcon />}
                onClick={handleClick}
            >
                Adicionar Atividade
            </Button>
        </GridToolbarContainer>
    )
}

export default function AtividadeCrudGrid() {
    const [rows, setRows] = React.useState(initialRows)
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({})

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true
        }
    }

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
    }

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    }

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id))
    }

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        })

        const editedRow = rows.find((row) => row.id === id)
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id))
        }
    }

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false }
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
        return updatedRow
    }

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel)
    }

    const columns: GridColDef[] = [
        { field: "name", headerName: "Nome", width: 250, editable: true },
        {
            field: "project",
            headerName: "Projeto",

            width: 220,
            align: "left",
            headerAlign: "left",
            editable: true,
        },
        {
            field: "initDate",
            headerName: "Data de Início",
            type: "date",
            width: 120,
            editable: true,
        },
        {
            field: "finishDate",
            headerName: "Data de Fim",
            type: "date",
            width: 120,
            editable: true,
        },
        {
            field: "role",
            headerName: "Categoria",
            width: 180,
            editable: true,
            type: "singleSelect",
            valueOptions: ["Social", "Cultural", "Técnico-Científico"],
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<IoCheckmarkOutline />}
                            label="Save"
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<IoCloseOutline />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ]
                }

                return [
                    <GridActionsCellItem
                        icon={<FiEdit3 />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<AiOutlineDelete />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        sx={{ color: colors.delete }}
                    />,
                ]
            },
        },
    ]

    return (
        <Box
            sx={{
                height: 500,
                width: "100%",
                "& .actions": {
                    color: "text.secondary",
                },
                "& .textPrimary": {
                    color: "text.primary",
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar as GridSlots["toolbar"],
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </Box>
    )
}
