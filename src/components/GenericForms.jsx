import React, { useEffect, useState } from 'react'
import { getGenericForm } from '../service/generic-form.service'
import { useNavigate } from 'react-router-dom'

const GenericForms = () => {
    const [state, setState] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const get = async () => {
            const data = await getGenericForm()
            setState(data)
        }
        get()
    }, [])
    return (
        <div>
            <p>
                Generic Forms
            </p>
            <div>
                {
                    state?.map((v) => {
                        return (
                            <div>
                                <p>{v?.name}</p>
                                <p>{v?.id}</p>
                                <button onClick={() => { navigate(`/build?id=${v.id}`) }}>Edit</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GenericForms