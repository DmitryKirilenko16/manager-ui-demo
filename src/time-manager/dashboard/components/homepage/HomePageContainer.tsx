import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const HomePageContainer: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({} /* fetchPerson() */) // fake
    }, [dispatch])

    return <h1 style={{ color: 'white' }}>Coming soon...</h1>
}
