import React from 'react'
import { UsersDetailsHeader } from './components/details/users-details-header/UsersDetailsHeader'
import { UsersDetailsCard } from './components/details/users-details-card/UsersDetaisCard'

export const UsersDetailsContainer: React.FC = () => {

    return (
        <>
            <UsersDetailsHeader />
            <UsersDetailsCard />
        </>
    )
}
