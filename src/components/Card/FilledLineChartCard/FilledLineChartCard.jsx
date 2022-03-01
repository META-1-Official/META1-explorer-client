import {XAxis, AreaChart, Area, ResponsiveContainer} from 'recharts';

const data = [
  {uv: 100, date: 'Sep 8'},
  {uv: 400, date: 'Sep 9'},
  {uv: 200, date: 'Sep 10'},
  {uv: 500, date: 'Sep 11'},
  {uv: 300, date: 'Sep 12'},
  {uv: 400, date: 'Sep 13'},
];

export const FilledLineChartCard = () => {
  return (
    <div className="card card-filled-line-chart">
      <div className="card-body">
        <span>Daily DEX Volume in META1 for the last 30 days</span>
      </div>
      <div className="card-action">
        <ResponsiveContainer width="100%" height={262}>
          <AreaChart width={408} height={262} data={data} syncId="anyId">
            <XAxis dataKey="date" />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#9D7807"
              fill="#9D7807"
              dot={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
