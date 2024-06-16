import React from "react"
import { Routes as ReactRoutes, Route } from "react-router-dom"
// import { Home } from "./pages/Home"
import { Auth } from "./pages/Authentication"
import { Student } from "./pages/Student"
import { useUser } from "./hooks/useUser"
import { User } from "./types/server/class/user"
import { Admin } from "./pages/Admin"

interface RoutesProps {}

const UserRoutes: React.FC<{ user: User }> = ({}) => {
    // const bottomMenu = useNavigationList()
    return (
        <>
            <ReactRoutes>
                <Route path="/student/*" element={<Student />} />
            </ReactRoutes>
        </>
    )
}
const AdminRoutes: React.FC<{ user: User }> = ({ user }) => {
    return (
        <>
            <ReactRoutes>
                <Route path="/admin/*" element={<Admin user={user} />} />
            </ReactRoutes>
        </>
    )
}

const UnauthenticatedRoutes = () => (
    <ReactRoutes>
        <Route index element={<Auth />} />
        <Route path="/" element={<Auth />} />
        <Route path="/*" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />
        {/* <Route path="/student/*" element={<Student />} /> */}
    </ReactRoutes>
)

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user } = useUser()

    return user ? user.isAdmin ? <AdminRoutes user={user} /> : <UserRoutes user={user} /> : <UnauthenticatedRoutes />
}
