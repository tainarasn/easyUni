import React from "react"
import { Routes as ReactRoutes, Route } from "react-router-dom"
import { PanelAdmin } from "./Panel"
import { User } from "../../types/server/class/user"

interface StudentProps {
    user: User
}

export const Admin: React.FC<StudentProps> = ({ user }) => {
    return (
        <ReactRoutes>
            <Route index element={<PanelAdmin location="init" />} />
            <Route path="/init" element={<PanelAdmin location="init" />} />
            {/* <Route path="/materias" element={<PanelStudent location="materias" />} />
            <Route path="/ranking" element={<PanelStudent location="ranking" />} />
            <Route path="/atividades" element={<PanelStudent location="atividades" />} /> */}
            <Route path="/account" element={<PanelAdmin location="account" />} />
        </ReactRoutes>
    )
}
