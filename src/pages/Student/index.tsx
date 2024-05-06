import React from "react"
import { Routes as ReactRoutes, Route } from "react-router-dom"
import { PanelStudent } from "./Panel"

interface StudentProps {
    // user: User
}

export const Student: React.FC<StudentProps> = ({}) => {
    return (
        <ReactRoutes>
            <Route index element={<PanelStudent location="init" />} />
            <Route path="/init" element={<PanelStudent location="init" />} />
            <Route path="/materias" element={<PanelStudent location="materias" />} />
            <Route path="/ranking" element={<PanelStudent location="ranking" />} />
            <Route path="/atividades" element={<PanelStudent location="atividades" />} />
            <Route path="/account" element={<PanelStudent location="account" />} />
        </ReactRoutes>
    )
}
