import React, { useEffect, useRef, useState } from 'react'
import { Formio } from 'formiojs';

const CustomForm = ({ components = {} }) => {

    useEffect(() => {
        Formio.createForm(document.getElementById("formio"), components).then(form => {
            form.on("submit", function (submission) {
                console.log("Submission was made", submission);
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