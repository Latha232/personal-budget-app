import React from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function PieChartComponent(props) {
    const RADIAN = Math.PI / 180;
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        if (percent > 0) {
            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" key={index}>
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        } else {
            return null;
        }
    };

    return (
        <ResponsiveContainer width={'100%'} height={300}>
            <PieChart
                data={props.data ? props.data : []}
            >
                <Pie
                    data={props.data ? props.data : []}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="net"
                    nameKey="category"
                    cx={'50%'}
                    cy={'50%'}
                >
                    {props.data && props.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default PieChartComponent
