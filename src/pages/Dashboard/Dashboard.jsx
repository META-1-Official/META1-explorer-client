import {useState} from 'react';

import {Tab} from '../../components/Tab';

const tabs = [
  {
    value: 'operations',
    label: 'Operations',
  },
  {
    value: 'markets',
    label: 'Markets',
  },
  {
    value: 'holders',
    label: 'Holders',
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('operations');

  return (
    <div className="page" style={{padding: '2em'}}>
      <Tab tabs={tabs} activeTab={activeTab} onChangeTab={setActiveTab} />
      {/* <LineChartCard
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
      <FilledLineChartCard /> */}
    </div>
  );
}
