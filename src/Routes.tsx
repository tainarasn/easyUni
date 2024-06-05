import React from "react"
import { Routes as ReactRoutes, Route } from "react-router-dom"
// import { Home } from "./pages/Home"
import { Auth } from "./pages/Authentication"
import { Student } from "./pages/Student"
import { useUser } from "./hooks/useUser"
import { User } from "./types/server/class/user"

interface RoutesProps {}

const UserRoutes: React.FC<{ user: User }> = ({}) => {
    // const bottomMenu = useNavigationList()
    return (
        <>
            {/* <BottomNavigation section={user.student ? bottomMenu.student : bottomMenu.creator} /> */}
            <ReactRoutes>
                <Route path="/student/*" element={<Student />} />
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
        <Route path="/student/*" element={<Student />} />
    </ReactRoutes>
)

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user } = useUser()

    return user ? <UserRoutes user={user} /> : <UnauthenticatedRoutes />
}
