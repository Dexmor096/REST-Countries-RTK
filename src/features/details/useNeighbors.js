import {useDispatch, useSelector} from "react-redux";
import {clearDetails, loadNeighborsByBorder, selectNeighbors} from "./detailsSlice";
import {useEffect} from "react";


export const useNeighbors = (borders = []) => {
    const dispatch = useDispatch();
    const neighbors = useSelector(selectNeighbors);

    useEffect(() => {
        if (borders.length) {
            dispatch(loadNeighborsByBorder(borders));
        }
        return () => clearDetails;
    }, [borders, dispatch]);
    return neighbors
};