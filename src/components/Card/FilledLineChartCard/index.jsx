import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

export const FilledLineChartCard = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div className="card card-filled-line-chart">
      <div className="card-body">
        <span>{t('Daily DEX Volume in META1 for the last 30 days')}</span>
      </div>
      <div className="card-action">
        <ResponsiveContainer width="100%" height={262}>
          <AreaChart width={408} height={262} data={data} syncId="anyId">
            {/* <XAxis dataKey="date" /> */}
            <Tooltip />
            <Area
              type="monotone"
              dataKey="volume"
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
