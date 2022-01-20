import WidgetsIcon from '@mui/icons-material/Widgets';

import {
  FilledLineChartCard,
  LineChartCard,
  SearchCard,
} from '../../components/Card';

export default function Dashboard() {
  return (
    <div className="page" style={{padding: '2em'}}>
      <LineChartCard
        title="Block Number"
        number={8275717}
        icon={<WidgetsIcon sx={{color: '#ffc000'}} />}
      />
      <SearchCard
        title="Search Block"
        description="Search by block by inserting block number. No commas, no dots, just pure numbers."
        searchInputSample="194"
        searchInputLabel="Block number"
        searchInputPlaceholder="Enter block number"
      />
      <FilledLineChartCard />
    </div>
  );
}
