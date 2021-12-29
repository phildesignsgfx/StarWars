import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../store/appContext';
import { Link } from 'react-router-dom';

const VehiclesCarousel = () => {
    const { store, actions } = useContext(AppContext);
    const [clicked, setClicked] = useState(false);
    const vehicles = store.vehicles;
    const setVehicles = actions.setVehicles;

    const btnOff = 'btn-outline-warning';
    const btnOn = 'btn-warning';

    const isFavorite = name => {
        actions.addToFavorites(name);

        setClicked(true);
    };

    /////////////////////////////
    //// USE EFFECTS
    /////////////////////////////

    useEffect(() => {
        actions.fetchVehicleData();
    }, []);

    useEffect(() => {
        const getData = localStorage.getItem('vehicles');
        const loadedData = JSON.parse(getData);

        if (loadedData) {
            setVehicles(loadedData);
        }
    }, []);

    useEffect(() => {
        const toJSON = JSON.stringify(vehicles);
        localStorage.setItem('vehicles', toJSON);
    }, [vehicles]);

    return (
        <>
            <h1 className="display-3 text-warning fw-bold font-monospace">Vehicles</h1>
            <div className="row d-flex flex-row flex-nowrap overflow-auto mb-4">
                {vehicles.map(
                    ({
                        result: {
                            properties: { name },
                            description,
                            uid,
                            _id,
                        },
                    }) => {
                        return (
                            <div key={uid} className="col-3 w-auto gx-1">
                                <div className="card mx-1" style={{ width: '350px' }}>
                                    <img
                                        src="https://dummyimage.com/350x200/9e9e9e/000000.jpg"
                                        className="card-img-top"
                                        alt="..."
                                    />
                                    <div className="card-body bg-secondary">
                                        <h5 className="card-title text-warning fw-bold font-monospace">
                                            {name}
                                        </h5>
                                        <p className="card-text font-monospace text-white">{description}</p>
                                        <Link to={`/vehicle/${_id}`}>
                                            <span className="btn btn-warning fw-bold font-monospace">
                                                Learn more!
                                            </span>
                                        </Link>
                                        <button
                                            className={`btn ${
                                                clicked && store.favorites.includes(name) ? btnOn : btnOff
                                            } float-end`}
                                            onClick={() => isFavorite(name)}
                                        >
                                            <i className="bi bi-star"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    },
                )}
            </div>
        </>
    );
};

export default VehiclesCarousel;
