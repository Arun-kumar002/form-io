import React, { useEffect, useState } from 'react'
import { Formio } from 'formiojs';
import { useNavigate, useParams } from 'react-router-dom';
import { getGenericFormById, saveFormData } from '../service/generic-form.service';
import SweetAlert2 from 'react-sweetalert2';

const CustomForm = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [swalProps, setSwalProps] = useState({});

    useEffect(() => {

        const get = async () => {
            const data = await getGenericFormById(params);
            Formio.createForm(document.getElementById("formio"), data.schema).then(form => {
                form.on("submit", async function (submission) {
                    console.log("Submission was made", submission);
                    let data = await saveFormData(submission.data)

                    setSwalProps({
                        show: true,
                        title: 'Form successfully submitted.',
                        text: `Submit id : ${data.id}`,
                    });

                    navigate(`/submit/${data.id}`)
                });
            });
        }
        get()

    }, [params]);


    return (
        <>
            <div style={{ padding: "50px" }}>
                <div id="formio"></div>
            </div>
            <SweetAlert2 {...swalProps} />
        </>
    )
}

export default CustomForm

// const logoHTML = ' <div style=" max-width: 100%;display:flex;align-item:center;justify-content:center "><img src="https://res.cloudinary.com/dtsc3z4wd/image/upload/v1704953524/logo_n86qdj.png" alt="Logo"style="max-width: 10%; border-radius: 300px"></div>'