import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const DashboardLineChart = (props) => {
    return (
        <div className='dash-chart col-md-12'>
            <ResponsiveContainer width='100%' height={300}>
                <LineChart
                    data={props.data ? props.data : []}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey='month'>
                        <Label value='Month' offset={-5} position='insideBottom' />
                    </XAxis>
                    <YAxis
                        label={{
                            value: 'Net Income for this Year',
                            position: 'insideLeft',
                            angle: '-90',
                        }}
                    />
                    <Tooltip />
                    <Line type="monotone" dataKey="net" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={5} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default DashboardLineChart
