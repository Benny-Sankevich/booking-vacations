import React, { useEffect } from "react";
import "./BarChart.css";
import { Bar } from 'react-chartjs-2';
import store from "../../../Redux/Store";
import { useHistory } from "react-router-dom";

//Bar chart 
function BarChart(): JSX.Element {

    const history = useHistory();

    if (!store.getState().usersState.userIsLoggedIn || store.getState().usersState.user.isAdmin !== 1) {
        history.push("/home");
    }
    //Get Vacation only if have followers of vacation
    const destination: string[] = store.getState().vacationsState.vacations.map(v => v.countFollows > 0 ? v.destination : undefined);
    const countFollows: number[] = store.getState().vacationsState.vacations.map(v => v.countFollows > 0 ? v.countFollows : undefined);

    //check if have undefined in array
    let destinationWithFollows = [];
    for (const item of destination) {
        if (item !== undefined) {
            destinationWithFollows.push(`${item}`);
        }
    }
    let countWithFollows = [];
    for (const item of countFollows) {
        if (item !== undefined) {
            countWithFollows.push(`${item}`);
        }
    }
    //Check if destination is empty
    useEffect(() => {
        if (destination.length === 0) {
            history.push("/vacations");
            return;
        }
    })

    return (
        <div className="BarChart">
            <Bar
                data={{
                    labels: destinationWithFollows,
                    datasets: [
                        {
                            label: 'Followers',
                            data: countWithFollows,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 5,
                        }]
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1,
                                },
                            },
                        ],
                    },
                    legend: {
                        labels: {
                            fontSize: 25,
                        },
                    },

                }}
            />
        </div>
    )
}
export default BarChart;