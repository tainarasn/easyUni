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
            <Route path="/materias" element={<PanelAdmin location="materias" user={user} />} />
            <Route index element={<PanelAdmin location="courses" user={user} />} />
            <Route index path="/courses" element={<PanelAdmin location="courses" user={user} />} />
            <Route path="/students" element={<PanelAdmin location="students" user={user} />} />
            <Route path="/trails" element={<PanelAdmin location="trails" user={user} />} />
            <Route path="/account" element={<PanelAdmin location="account" user={user} />} />
        </ReactRoutes>
    )
}
