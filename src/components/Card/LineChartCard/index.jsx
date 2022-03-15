import {LineChart, Line} from 'recharts';

import {localizeNumber} from '../../../helpers/utility';
import Loader from '../../../components/Loader/Loader';

const mock_chart_data = [
  {uv: 100},
  {uv: 400},
  {uv: 200},
  {uv: 500},
  {uv: 300},
  {uv: 400},
];

export const LineChartCard = ({title, number, icon, isLoading}) => {
  return (
    <div className="card card-line-chart">
      <div className="card-body">
        <div className="card-content">
          <div className="card-icon">
            <img src={icon} alt={title} />
          </div>
          <div className="card-title">
            <span>{title}</span>
            {!isLoading ? <span>{localizeNumber(number)}</span> : <Loader />}
          </div>
        </div>
      </div>
      <div className="card-action">
        {!isLoading && (
          <LineChart width={275} height={76} data={mock_chart_data}>
            <Line type="natural" dataKey="uv" stroke="#ffc000" dot={false} />
          </LineChart>
        )}
      </div>
    </div>
  );
};
