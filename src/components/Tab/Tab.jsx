import PropTypes from 'prop-types';

import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';

export const Tab = ({tabs, activeTab = 'operations', onChangeTab}) => {
  const onChangeActiveTab = (_, newTab) => {
    onChangeTab(newTab);
  };

  return (
    <MuiTabs
      value={activeTab}
      onChange={onChangeActiveTab}
      aria-label="basic tabs example"
    >
      {tabs.map((tab) => (
        <MuiTab
          key={tab.value}
          label={tab.label}
          value={tab.value}
          id={`tab-${tab.value}`}
          aria-controls={`tab-panel-${tab.value}`}
        />
      ))}
    </MuiTabs>
  );
};

Tab.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onChangeTab: PropTypes.func.isRequired,
};
