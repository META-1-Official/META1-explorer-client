import { useMemo } from 'react';
import { LineChart, Line } from 'recharts';

import { localizeNumber } from '../../../helpers/utility';
import Loader from '../../../components/Loader/Loader';
import { useTranslation } from 'react-i18next';

const mock_chart_data = [
  { uv: 100 },
  { uv: 400 },
  { uv: 200 },
  { uv: 500 },
  { uv: 300 },
  { uv: 400 },
];

export const LineChartCard = ({
  title,
  number,
  chartData,
  icon,
  isLoading,
}) => {
  const { t } = useTranslation();
  const memoizedChartData = useMemo(() => {
    if (chartData) {
      return chartData.reduce((acc, curr) => {
        acc.push({ uv: curr });
        return acc;
      }, []);
    }
    return mock_chart_data;
  }, [chartData]);

  return (
    <div className="card card-line-chart">
      <div className="card-body">
        <div className="card-content">
          <div className="card-icon">
            <img src={icon} alt={title} />
          </div>
          <div className="card-title">
            <span>{t(title.toUpperCase())}</span>
            {!isLoading ? <span>{localizeNumber(number)}</span> : <Loader />}
          </div>
        </div>
      </div>
      <div className="card-action">
        {!isLoading && chartData && (
          <LineChart
            width={275}
            height={70}
            margin={{ top: 5, bottom: 10 }}
            data={memoizedChartData}
          >
            <Line type="natural" dataKey="uv" stroke="#ffc000" dot={false} />
          </LineChart>
        )}
      </div>
    </div>
  );
};
