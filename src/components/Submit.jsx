import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getFormSavedDataById } from '../service/generic-form.service'

const Submit = () => {
    const params = useParams()
    const [state, setState] = useState({})

    useEffect(() => {
        const get = async () => {
            const data = await getFormSavedDataById(params);
            setState(data)

        }
        get()
    }, [params])
    return (
        <div>
            <p>Form Submitted . Submit id: {params.id}</p>
            {
                Object.keys(state).map((v, i) => {
                    return (<p key={i}>Key : {v}  Value:{state?.[v]}</p>)
                })
            }

            <Link to={"/"}>Build</Link>
        </div>
    )
}

export default Submit