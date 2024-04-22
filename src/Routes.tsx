import React from "react"
import { Routes as ReactRoutes, Route } from "react-router-dom"
// import { User } from "./types/server/class"

import { Home } from "./pages/Home"
import { Auth } from "./pages/Authentication"
import { Signup } from "./pages/Signup"
// import { useUser } from "./hooks/useUser"
import { Student } from "./pages/Student"
import { useUser } from "./hooks/useUser"
import { User } from "./types/class/user"

interface RoutesProps {}

const UserRoutes: React.FC<{ user: User }> = ({ user }) => {
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
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Home />} />
    </ReactRoutes>
)

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user } = useUser()

    return user ? <UserRoutes user={user} /> : <UnauthenticatedRoutes />
}
