import React from "react";
import { FormBuilder } from "react-formio";
import { useNavigate } from "react-router-dom";

export function Builder(props) {
    const navigate = useNavigate()

    const onChange = (schema) => {
        if (schema?.type === "columns") {

            let comp = JSON.parse(JSON.stringify(props.workingSource));
            let allComp = [];
            for (let v of comp?.components) {
                if (v?.key !== schema?.key) { allComp.push(v); }
                else {
                    allComp.push(schema);
                }
            }
            props.setWorkingSource({ ...props.workingSource, components: allComp });
        }
        else if (schema?.type === "table" || schema?.type === "editGrid") {

            let all = []

            for (let x of props?.workingSource?.components) {
                if (x.key === schema.key) {
                    all.push(schema)
                } else {
                    all.push(x)
                }
            }

            props.setWorkingSource({ ...schema, components: all });
        }
        else if (schema?.type === "tabs") {
            let allComp = [];
            for (let v of schema?.components) {
                if (v.type === "file") {
                    allComp.push({ type: "file", key: v?.key, label: v?.label, storage: "base64", image: true, fileSize: "10240KB" });
                }
                else {
                    allComp.push(v);
                }
            }

            let all = []

            for (let x of props?.workingSource?.components) {
                if (x.key === schema.key) {
                    all.push({ ...x, components: allComp })
                } else {
                    all.push(x)
                }
            }

            props.setWorkingSource({ ...schema, components: all });
        } else {

            let allComp = [];
            for (let v of schema?.components) {
                if (v.type === "file") {
                    allComp.push({ type: "file", key: v.key, label: v.label, storage: "base64", image: true, fileSize: "10240KB" });
                }
                else {
                    allComp.push(v);
                }
            }

            props.setWorkingSource({ ...schema, components: allComp });

        }

    };

    return (
        <div className="App" style={{ padding: "50px" }}>

            <FormBuilder
                form={props.workingSource}
                onDeleteComponent={(...p) => {
                    onChange(p[1]);
                }}
                onSaveComponent={(...p) => {
                    console.log(p)
                    onChange(p[2]);
                }}
                options={{
                    noDefaultSubmitButton: false
                }}
            />
            <button type="button" className="btn btn-primary" onClick={() => navigate("/render")}>
                Save
            </button>
        </div>
    );
}
