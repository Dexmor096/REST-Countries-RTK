import {Info} from "./Info";

import {useLoadCountry} from "./useLoadCountry";

export const CountryDetails = ({navigate, name}) => {
    const [currentCountry, error, status] = useLoadCountry(name);

    return <>
        {status === 'loading' && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        {currentCountry && <Info push={navigate} {...currentCountry} />}
    </>
}