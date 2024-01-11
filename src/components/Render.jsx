import React, { useEffect, useState } from 'react'
import { Formio } from 'formiojs';
import { useNavigate } from 'react-router-dom';

const CustomForm = ({ components = {}, setState }) => {
    const navigate = useNavigate()
    useEffect(() => {
        // const logoHTML = ' <div style=" max-width: 100%;display:flex;align-item:center;justify-content:center "><img src="https://res.cloudinary.com/dtsc3z4wd/image/upload/v1704953524/logo_n86qdj.png" alt="Logo"style="max-width: 10%; border-radius: 300px"></div>'
        // document.getElementById("formio").insertAdjacentHTML('beforebegin', logoHTML);
        Formio.createForm(document.getElementById("formio"), components).then(form => {
            form.on("submit", function (submission) {
                console.log("Submission was made", submission);
                setState(submission.data)
                navigate("/submit")
            });
        });

    }, [components]);


    return (
        <>
            <div id="formio"></div>
        </>
    )
}

export default CustomForm