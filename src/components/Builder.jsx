import React from "react";
import { FormBuilder } from "react-formio";
export function MyForm(props) {
    return (
        <div className="App">
            <FormBuilder
                form={props.source}
                onDeleteComponent={(...p) => {
                    props.onChange(p[1]);
                }}
                onSaveComponent={(...p) => {
                    console.log(p)
                    props.onChange(p[2]);
                }}
                options={{
                    noDefaultSubmitButton: false
                }}
            />
        </div>
    );
}
