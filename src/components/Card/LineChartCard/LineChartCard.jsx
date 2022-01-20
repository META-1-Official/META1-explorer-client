import {LineChart, Line} from 'recharts';

import {localizeNumber} from '../../../helpers/utility';

const data = [{uv: 100}, {uv: 400}, {uv: 200}, {uv: 500}, {uv: 300}, {uv: 400}];

export const LineChartCard = ({title, number, icon}) => {
  return (
    <div className="card card-line-chart">
      <div className="card-body">
        <div className="card-content">
          <div className="card-icon">{icon}</div>
          <div className="card-title">
            <span>{title}</span>
            <span>{localizeNumber(number)}</span>
          </div>
        </div>
      </div>
      <div className="card-action">
        <LineChart width={275} height={76} data={data}>
          <Line type="natural" dataKey="uv" stroke="#ffc000" />
        </LineChart>
      </div>
    </div>
  );
};
