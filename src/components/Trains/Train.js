import React from 'react'

const Train = (props) => {
    const { trainsList } = props;
    return (
        <div className="col-md-6 text-center">
            <div className="crd mb-4 shadow-sm">
                <div className="card-body bg-light">
                    <h5>{trainsList.startStationName} - {trainsList.endStationName}</h5>
                    <p className="card-text">
                        <strong><i className="fas fa-time"></i>Arrival Time </strong>: {trainsList.arrivalTime}
                        <br />
                        <strong><i className="fas fa-play"></i>Arrival Time End Station </strong>: {trainsList.arrivalTimeEndStation}
                        <br />
                        <strong><i className="fas fa-play"></i>Final Station </strong>: {trainsList.finalStationName}

                    </p>
                </div>
            </div>
        </div>
    )
}
export default Train;