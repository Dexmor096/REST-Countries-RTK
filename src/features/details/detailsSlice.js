import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentCountry: null,
    status: 'idle',
    error: null,
    neighbors: [],
}

export const loadCountryByName = createAsyncThunk(
    '@@details/loadCountry',
    async (name, {extra: {client, api}}) => {
        return await client.get(api.searchByCountry(name))
    }
)
export const loadNeighborsByBorder = createAsyncThunk(
    '@@details/loadNeighborsByBorder',
    async (borders, {extra: {client, api}}) => {
        return await client.get(api.filterByCode(borders))
    }
)

export const detailsSlice = createSlice({
    name: '@@details',
    initialState,
    reducers: {
        clearDetails: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCountryByName.pending, (state,action) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadCountryByName.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || 'ERROR'
            })
            .addCase(loadCountryByName.fulfilled, (state, action) => {
                state.status = 'received';
                state.error = null;
                state.currentCountry = action.payload.data[0];
            })
            .addCase(loadNeighborsByBorder.fulfilled, (state,action) => {
                state.neighbors = action.payload.data.map((c)=> c.name);
            })
    }
})

export const {clearDetails} = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;

//selects
export const selectCurrentCountry = (state) => state.details.currentCountry;
export const selectDetails = (state) => state.details;
export const selectNeighbors = (state) => state.details.neighbors;
