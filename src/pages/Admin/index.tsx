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
            <Route path="/materias" element={<PanelAdmin location="materias" />} />
            <Route path="/courses" element={<PanelAdmin location="courses" />} />
            <Route path="/students" element={<PanelAdmin location="students" />} />
            <Route path="/trails" element={<PanelAdmin location="trails" />} />
            <Route path="/account" element={<PanelAdmin location="account" />} />
        </ReactRoutes>
    )
}
