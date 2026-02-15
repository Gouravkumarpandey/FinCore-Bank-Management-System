import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ActivityChart = ({ data }) => {
    // Labels for the last 6 months (example)
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                backgroundColor: '#FCCF08', // Brand Yellow
                borderRadius: 4,
            },
            {
                label: 'Expenses',
                data: [8000, 12000, 10000, 18000, 15000, 22000],
                backgroundColor: 'rgba(255, 255, 255, 0.2)', // White/Gray
                borderRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    color: '#9CA3AF', // Gray-400
                },
            },
            title: {
                display: false,
                text: 'Activity',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#9CA3AF',
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Very light white
                    borderDash: [5, 5],
                    drawBorder: false,
                },
                ticks: {
                    callback: (value) => `₹${value}`,
                    color: '#9CA3AF',
                },
            },
        },
        elements: {
            bar: {
                borderWidth: 0,
            },
        },
    };

    return (
        <div className="w-full h-80">
            {/* Removed bg-white, using parent's background */}
            <div className="relative h-full w-full">
                <Bar options={options} data={chartData} />
            </div>
        </div>
    );
};

ActivityChart.propTypes = {
    data: PropTypes.array,
};

export default ActivityChart;
