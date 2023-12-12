import React, { useEffect, useState } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Label,
    ResponsiveContainer,
    Cell,
} from 'recharts'

const DashboardChart = (props) => {
    return (
        <div className='dash-chart col-md-12'>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart
                    data={props.data ? props.data : []}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey='month'>
                        <Label value='Month' offset={-5} position='insideBottom' />
                    </XAxis>
                    <YAxis
                        label={{
                            value: 'Income/Expenses',
                            position: 'insideLeft',
                            angle: '-90',
                        }}
                    />
                    <Tooltip />
                    <Bar dataKey='debit'>
                        {props.data && props.data.map((entry, index) => (
                            <React.Fragment key={`cell-${index}`}>
                                <Cell key={`cell-${index}`} fill={'#FF4D48'} />
                            </React.Fragment>
                        ))}
                    </Bar>
                    <Bar dataKey='credit'>
                        {props.data && props.data.map((entry, index) => (
                            <React.Fragment key={`cell-${index}`}>
                                <Cell key={`cell-${index}`} fill={'#0EBA70'} />
                            </React.Fragment>
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default DashboardChart
