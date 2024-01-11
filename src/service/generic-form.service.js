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
        console.log("Error:[createGenericForm]", error);
    }
}

export const getGenericFormById = async (payload) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/generic-form/${payload.id}`);
        return data;
    } catch (error) {
        console.log("Error:[createGenericForm]", error);
    }
}


export const updateGenericForm = async (payload) => {
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/generic-form/${payload.id}`, payload.value);
        return data;
    } catch (error) {
        console.log("Error:[createGenericForm]", error);
    }
}

export const removeGenericForm = async (payload) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/generic-form/${payload.id}`);
        return data;
    } catch (error) {
        console.log("Error:[createGenericForm]", error);
    }
}

export const saveFormData = async (payload) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/form-data`, payload);
        return data;
    } catch (error) {
        console.log("Error:[createGenericForm]", error);
    }
}

export const getFormSavedDataById = async (payload) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/form-data/${payload.id}`);
        return data;
    } catch (error) {
        console.log("Error:[createGenericForm]", error);
    }
}

export const getDropDownDataBySelection = async (payload) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/drop-down`);
        return data;
    } catch (error) {
        console.log("Error:[createGenericForm]", error);
    }
}