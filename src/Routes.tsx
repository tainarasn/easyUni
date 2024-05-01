import React from "react"
import { Routes as ReactRoutes, Route } from "react-router-dom"
// import { User } from "./types/server/class"

import { Home } from "./pages/Home"
import { Auth } from "./pages/Authentication"
// import { useUser } from "./hooks/useUser"
import { Student } from "./pages/Student"
import { useUser } from "./hooks/useUser"
import { User } from "./types/class/user"

interface RoutesProps {}

const UserRoutes: React.FC<{ user: User }> = ({}) => {
    // const bottomMenu = useNavigationList()
    return (
        <>
            {/* <BottomNavigation section={user.student ? bottomMenu.student : bottomMenu.creator} /> */}
            <ReactRoutes>
                <Route path="/easyUni/student/*" element={<Student />} />
            </ReactRoutes>
        </>
    )
}

const UnauthenticatedRoutes = () => (
    <ReactRoutes>
        <Route index element={<Home />} />
        <Route path="/easyUni/" element={<Home />} />
        <Route path="/easyUni/*" element={<Home />} />
        <Route path="/easyUni/auth" element={<Auth />} />
        <Route path="/easyUni/student/*" element={<Student />} />
    </ReactRoutes>
)

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user } = useUser()

    return user ? <UserRoutes user={user} /> : <UnauthenticatedRoutes />
}
