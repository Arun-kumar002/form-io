import axios from "axios";

export const createGenericForm = async (payload) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/generic-form`, payload);
        return data;
    } catch (error) {
        console.log("Error:[createGenericForm]", error);
    }
}

export const getGenericForm = async () => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/generic-form`);
        return data;
    } catch (error) {
        console.log("Error:[getGenericForm]", error);
    }
}

export const getGenericFormById = async (payload) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/generic-form/${payload.id}`);
        return data;
    } catch (error) {
        console.log("Error:[getGenericFormById]", error);
    }
}


export const updateGenericForm = async (payload) => {
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/generic-form/${payload.id}`, payload.value);
        return data;
    } catch (error) {
        console.log("Error:[updateGenericForm]", error);
    }
}

export const removeGenericForm = async (payload) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/generic-form/${payload.id}`);
        return data;
    } catch (error) {
        console.log("Error:[removeGenericForm]", error);
    }
}

export const saveFormData = async (payload) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/form-data`, payload);
        return data;
    } catch (error) {
        console.log("Error:[saveFormData]", error);
    }
}

export const getFormSavedDataById = async (payload) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/form-data/${payload.id}`);
        return data;
    } catch (error) {
        console.log("Error:[getFormSavedDataById]", error);
    }
}

export const getDropDownDataBySelection = async (config, select) => {
    try {
        const payload = JSON.parse(config?.payload?.replace(new RegExp("\\[" + config.inputKey + "\\]", "g"), select?.value));
        const { data } = await axios.get(config?.apiDataEndpoint, { params: payload });
        return data;
    } catch (error) {
        console.log("Error:[getDropDownDataBySelection]", error);
    }
}

export const getFormValidationByFormId = async (payload) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/form-validation?formId=${payload.id}`);
        return data;
    } catch (error) {
        console.log("Error:[getFormValidationByFormId]", error);
    }
}

export const getFormDropDownConfigByFormId = async (payload) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/form-config?formId=${payload.id}`);
        return data;
    } catch (error) {
        console.log("Error:[getFormDropDownConfigByFormId]", error);
    }
}