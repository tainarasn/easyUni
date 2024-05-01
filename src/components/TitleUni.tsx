import React from "react"

interface TitleUniProps {
    title: string
}

export const TitleUni: React.FC<TitleUniProps> = ({ title }) => {
    return <h2 style={{}}>{title}</h2>
}
