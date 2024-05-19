import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Activity = () => {
    const labels = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    const revenue = ["100", "200", "400", "400", "0", "400", "500", "300"];

    const options: {} = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            x: {
                grid: {
                    display: false // remove the x-axis line
                },
                labels,
                ticks: {
                    color: "#A1A1A1",
                    font: {
                        size: 12,
                        weight: 500,
                    }
                }
            },
            y: {
                grid: {
                    drawBorder: false,
                    drawTicks: false, // hide the ticks on the y-axis
                },
                type: "linear" as const,
                ticks: {
                    stepSize: 100,
                    // padding: 20,
                    color: "#A1A1A1",
                    font: {
                        size: 12,
                        weight: 500,
                    }
                }
            }
        }
    };
    const data: any = {
        labels,
        datasets: [
            {
                fill: true,
                data: revenue,
                borderColor: '#FAD2C1',
                // backgroundColor: "rgba(255, 99, 132, 0.01)",
                pointBackgroundColor: '#F07846',
                pointRadius: 4,
            },
        ],
    };

    return (
        <div className={"mt-6"}>
            <p className={"text-md text-primary font-semibold mb-4"}>Activity this week</p>

            <div className={"border-2 border-[#ECECEC] rounded-xl p-4"}>
                <p className={"font-semibold text-[#374151] mb-4 text-sm lg:text-base"}>Points earned: <span className={"text-[#F07846]"}>500pts</span></p>
                <Line data={data} options={options}/>
            </div>
        </div>
    );
};

export default Activity;