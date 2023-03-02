import {List} from "../../components/List";
import {Card} from "../../components/Card";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectControls} from "../controls/controlsSlice";
import {selectCountriesInfo, selectVisibleCountries} from "./countriesSlice";
import {useEffect} from "react";
import {loadCountries} from "./countriesSlice";


export const CountryList = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {search, region} = useSelector(selectControls);
    const countries = useSelector(state => selectVisibleCountries(state, {search, region}));
    const {status, error, qty} = useSelector(selectCountriesInfo);

    useEffect(() => {
        if (!qty) {
            dispatch(loadCountries());
        }
    }, [qty, dispatch]);


    return <>
        {error && <h2>Can't fetch data</h2>}p
        {status === 'loading' && <h2>Loading...</h2>}

        {status === 'received' && (
            <List>
                {countries.map((c) => {
                    const countryInfo = {
                        img: c.flags.png,
                        name: c.name,
                        info: [
                            {
                                title: 'Population',
                                description: c.population.toLocaleString(),
                            },
                            {
                                title: 'Region',
                                description: c.region,
                            },
                            {
                                title: 'Capital',
                                description: c.capital,
                            },
                        ],
                    };

                    return (
                        <Card
                            key={c.name}
                            onClick={() => navigate(`/country/${c.name}`)}
                            {...countryInfo}
                        />
                    );
                })}
            </List>
        )}
    </>
}