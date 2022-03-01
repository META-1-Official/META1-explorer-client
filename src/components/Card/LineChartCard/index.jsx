import {LineChart, Line} from 'recharts';

import {localizeNumber} from '../../../helpers/utility';
import Loader from '../../../components/Loader/Loader';

export const LineChartCard = ({title, number, icon, data, isLoading}) => {
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
          <LineChart width={275} height={76} data={data}>
            <Line type="natural" dataKey="uv" stroke="#ffc000" dot={false} />
          </LineChart>
        )}
      </div>
    </div>
  );
};
