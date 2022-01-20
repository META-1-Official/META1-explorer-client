import WidgetsIcon from '@mui/icons-material/Widgets';

import {LineChartCard} from '../../components/Card';

export default function Dashboard() {
  return (
    <div className="page" style={{padding: '2em'}}>
      <LineChartCard
        title="Block Number"
        number={8275717}
        icon={<WidgetsIcon sx={{color: '#ffc000'}} />}
      />
    </div>
  );
}
