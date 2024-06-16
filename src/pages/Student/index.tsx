import React from "react"
import { Routes as ReactRoutes, Route } from "react-router-dom"
import { PanelStudent } from "./Panel"
import { User } from "../../types/server/class/user"

interface StudentProps {
    user: User
}

export const Student: React.FC<StudentProps> = ({ user }) => {
    return (
        <ReactRoutes>
            <Route index element={<PanelStudent location="init" user={user} />} />
            <Route path="/init" element={<PanelStudent location="init" user={user} />} />
            <Route path="/materias" element={<PanelStudent location="materias" user={user} />} />
            <Route path="/ranking" element={<PanelStudent location="ranking" user={user} />} />
            <Route path="/atividades" element={<PanelStudent location="atividades" user={user} />} />
            <Route path="/account" element={<PanelStudent location="account" user={user} />} />
        </ReactRoutes>
    )
}
