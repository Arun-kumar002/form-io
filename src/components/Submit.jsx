import React from 'react'
import { Link } from 'react-router-dom'

const Submit = ({ state = {} }) => {
    return (
        <div>
            <p>Form Submitted</p>
            {
                Object.keys(state).map((v) => {
                    return (<p>Key : {v}  Value:{state?.[v]}</p>)
                })
            }

            <Link to={"/"}>Build</Link>
        </div>
    )
}

export default Submit