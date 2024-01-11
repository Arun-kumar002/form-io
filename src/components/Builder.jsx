import React, { useState } from "react";
import { FormBuilder } from "react-formio";
import { useNavigate } from "react-router-dom";
import { createGenericForm } from "../service/generic-form.service";

export function Builder() {
    const navigate = useNavigate()
    let [state, setState] = useState({})
    let [form, setForm] = useState({})

    return (
        <div className="App" style={{ padding: "50px" }}>
            <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
                <p>Enter form name</p>
                <input name="form-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <FormBuilder
                form={{ display: "form" }}
                onChange={schema => { setState(schema) }}

            />
            <button type="button" className="btn btn-primary" onClick={async () => {
                let data = await createGenericForm({ ...form, schema: state });
                navigate(`/render/${data.id}`)
            }}>
                Save
            </button>
        </div>
    );
}


// const onChange = (schema) => {
//     if (schema?.type === "columns") {

//         let comp = JSON.parse(JSON.stringify(props.workingSource));
//         let allComp = [];
//         for (let v of comp?.components) {
//             if (v?.key !== schema?.key) { allComp.push(v); }
//             else {
//                 allComp.push(schema);
//             }
//         }
//         props.setWorkingSource({ ...props.workingSource, components: allComp });
//     }
//     else if (schema?.type === "table" || schema?.type === "editGrid") {

//         let all = []

//         for (let x of props?.workingSource?.components) {
//             if (x.key === schema.key) {
//                 all.push(schema)
//             } else {
//                 all.push(x)
//             }
//         }

//         props.setWorkingSource({ ...schema, components: all });
//     }
//     else if (schema?.type === "tabs") {
//         let allComp = [];
//         for (let v of schema?.components) {
//             if (v.type === "file") {
//                 allComp.push({ type: "file", key: v?.key, label: v?.label, storage: "base64", image: true, fileSize: "10240KB" });
//             }
//             else {
//                 allComp.push(v);
//             }
//         }

//         let all = []

//         for (let x of props?.workingSource?.components) {
//             if (x.key === schema.key) {
//                 all.push({ ...x, components: allComp })
//             } else {
//                 all.push(x)
//             }
//         }

//         props.setWorkingSource({ ...schema, components: all });
//     } else {

//         let allComp = [];
//         for (let v of schema?.components) {
//             if (v.type === "file") {
//                 allComp.push({ type: "file", key: v.key, label: v.label, storage: "base64", image: true, fileSize: "10240KB" });
//             }
//             else {
//                 allComp.push(v);
//             }
//         }

//         props.setWorkingSource({ ...schema, components: allComp });

//     }

// };
