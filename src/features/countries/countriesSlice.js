import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";

import axios  from 'axios';
import {ALL_COUNTRIES} from "../../config";


export const loadCountries = createAsyncThunk(
    '@@countries/loadCountries',
    async () => {
        const response = await axios.get(ALL_COUNTRIES);
        return response.data;
    }
)


const initialState = {
    status: 'idle', // loading | received | rejected
    error: null,
    list: [],
}

export const countriesSlice = createSlice({
    name: '@@countries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCountries.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadCountries.rejected, (state) => {
                state.error = 'ERROR';
                state.status = 'rejected';
            })
            .addCase(loadCountries.fulfilled, (state, action) => {
                state.list = action.payload;
                state.status = 'received';
                state.error = null;
            })
    }
});

export const {setCountries} = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;

export const selectCountriesInfo = (state) => ({
    status: state.countries.status,
    error: state.countries.error,
    qty: state.countries.list.length
})

export const selectAllCountries = (state) => state.countries.list;
export const selectVisibleCountries = (state, {search = '', region = ''}) => {
    return state.countries.list.filter(
        country => (
            country.name.toLowerCase().includes(search.toLowerCase()) && country.region.includes(region)
        )
    )
}
