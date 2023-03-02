import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {clearDetails, loadCountryByName, selectDetails} from "./detailsSlice";


export const useLoadCountry = (name) => {
    const dispatch = useDispatch();
    const {currentCountry, error, status} = useSelector(selectDetails);

    useEffect(() => {
        dispatch(loadCountryByName(name));

        return () => dispatch(clearDetails())
    }, [name, dispatch]);
    return [currentCountry, error, status]
}