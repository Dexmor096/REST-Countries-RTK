import axios from "axios";
import {configureStore} from "@reduxjs/toolkit";

import {themeReducer} from "./features/theme/themeSlice";
import {controlsReducer} from "./features/controls/controlsSlice";
import {countriesReducer} from "./features/countries/countriesSlice";
import {detailsReducer} from "./features/details/detailsSlice";

import * as api from "./config";


export const store = configureStore({
    reducer: {
        theme: themeReducer,
        controls: controlsReducer,
        countries: countriesReducer,
        details: detailsReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: {
                client: axios,
                api,
            }
        },
        serializableCheck: false,
    })
})