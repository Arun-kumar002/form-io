
import React, { useEffect, useState } from 'react'
import { Formio, eachComponent } from 'formiojs';
import { useNavigate, useParams } from 'react-router-dom';
import { getDropDownDataBySelection, getFormDropDownConfigByFormId, getFormValidationByFormId, getGenericFormById, saveFormData } from '../service/generic-form.service';
import SweetAlert2 from 'react-sweetalert2';
import moment from 'moment';

const CustomForm = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [swalProps, setSwalProps] = useState({});
    const [formConfig, setFormConfig] = useState([]);
    const [isRender, setIsRender] = useState(false);
    const [validation, setValidation] = useState([]);


    useEffect(() => {
        if (params.id) {
            const get = async () => {
                const formData = await getFormDropDownConfigByFormId(params);
                setFormConfig(formData)
                const validationData = await getFormValidationByFormId(params);
                setValidation(validationData)
                setIsRender(!isRender)
            }
            get()
        }

    }, [params])

    useEffect(() => {

        const formSettings = {
            readOnly: false,
            noAlerts: false,
            hooks: {
                customValidation: async (submission, next) => {
                    const data = submission.data;
                    if (Array.isArray(validation)) {
                        for (let x of validation) {
                            if (x.type == "formula") {
                                const func = new Function("obj", `${x.formula}`);
                                const result = func(submission.data);
                                if (!result) {
                                    return next({
                                        message: x?.errorMessage,
                                        details: [{
                                            message: x?.errorMessage,
                                            path: [x?.key],
                                            level: 'error'
                                        }]
                                    })
                                }
                            }
                            else if (x.type == "date" && data[x["dateIn"]] && data[x["dateOut"]]) {
                                const dateOne = moment(data[x["dateIn"]]);
                                const dateTwo = moment(data[x["dateOut"]]);

                                if (!dateOne.isBefore(dateTwo)) {
                                    return next({
                                        message: `${x["dateIn"]} should be greater of  ${x["dateOut"]}`,
                                        details: [{
                                            message: `${x["dateIn"]} should be greater of ${x["dateOut"]}`,
                                            path: [x["dateIn"]],
                                            level: 'error'
                                        }]
                                    })
                                } else if (dateOne.isSame(dateTwo)) {
                                    return next({
                                        message: `${x["dateIn"]} & ${x["dateOut"]} should not be the same.`,
                                        details: [{
                                            message: `${x["dateIn"]} & ${x["dateOut"]} should not be the same.`,
                                            path: [x["dateIn"]],
                                            level: 'error'
                                        }]
                                    })
                                }
                            }
                        }
                    }

                    return next();
                }
            }
        };


        const get = async () => {
            const data = await getGenericFormById(params);
            Formio.createForm(document.getElementById("formio"), data.schema, formSettings).then(form => {
                form.on('change', async function (event) {
                    const data = event.data;
                    let updateConfig = []
                    for (let config of formConfig) {
                        if (config.type == "select" && data.hasOwnProperty(config.inputKey) && config?.previous != data[config.inputKey].value) {
                            const dropDownData = await getDropDownDataBySelection(config, data[config.inputKey])
                            const secondSelect = form.getComponent(config.outputKey);
                            if (secondSelect && secondSelect.info && secondSelect.info.component && secondSelect.info.component.data) {
                                console.log(secondSelect)
                                secondSelect.info.component.data.values = dropDownData;
                                event.data[config.outputKey] = ""
                                form.redraw();
                            }
                            config.previous = data[config?.inputKey]?.value
                            updateConfig.push(config)
                        } else {
                            updateConfig.push(config)
                        }
                    }

                    setFormConfig(updateConfig);

                    if (Array.isArray(validation)) {
                        for (let x of validation) {
                            if (x.type == "date" && data[x["dateIn"]] && data[x["dateOut"]]) {
                                const dateOne = moment(data[x["dateIn"]]);
                                const dateTwo = moment(data[x["dateOut"]]);
                                let tag = document.querySelector(`#${x["dateIn"]}`)
                                if (tag) {
                                    tag.innerHTML = `<p>${x["dateIn"]} & ${x["dateOut"]} difference ${dateOne.diff(dateTwo, "days")} days</p>`;
                                }
                            }
                        }
                    }
                });



                form.on("submit", async function (submission) {
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
        get();

    }, [params, isRender]);


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