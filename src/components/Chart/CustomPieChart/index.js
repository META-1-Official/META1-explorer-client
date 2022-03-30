import React, { useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Sector } from 'recharts';

// import constants
import { OPS_TYPE_LABELS, PIE_COLORS } from '../../../constants';

const CustomPieChart = ({ data, tabValue }) => {
    const [pieIndex, setPieIndex] = useState(0);

    const getColor = (name) => {
        var color = 'white';
        var v;
        if (tabValue === 0) {
            color = OPS_TYPE_LABELS.filter(
                (label) => label.text.toUpperCase() === name,
            )[0].color;
        } else {
            data.map((data, index) => {
                if(data.name === name) v = index
            })
            color = PIE_COLORS[v];
        }
        return color;
    };

    const onPieEnter = (_, index) => {
        setPieIndex(index);
    };

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const {
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            payload,
            percent,
            value,
            name,
        } = props;

        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 10) * cos;
        const my = cy + (outerRadius + 10) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text
                    style={{ fontSize: '24px' }}
                    x={cx}
                    y={cy}
                    dy={8}
                    textAnchor="middle"
                    fill={getColor(name)}
                >
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={getColor(name)}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={getColor(name)}
                />
                <path
                    d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                    stroke={getColor(name)}
                    fill={getColor(name)}
                />
                <circle
                    cx={ex}
                    cy={ey}
                    r={2}
                    fill={getColor(name)}
                    stroke={getColor(name)}
                />
                <text
                    style={{ fontSize: '13px' }}
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    textAnchor={textAnchor}
                    fill="#333"
                >{`PV ${value}`}</text>
                <text
                    style={{ fontSize: '13px' }}
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    dy={18}
                    textAnchor={textAnchor}
                    fill="#999"
                >
                    {`Rate ${(percent * 100).toFixed(2)}%`}
                </text>
            </g>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart width={200} height={200}>
                <Pie
                    activeIndex={pieIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    onMouseEnter={onPieEnter}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
