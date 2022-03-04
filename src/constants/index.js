const OPS_TYPE_LABELS = [
  {text: 'Asset Price Publish', color: '#FF2A55', type: 58},
  {text: 'Limit Order Create', color: '#6BBCD7', type: 1},
  {text: 'Fill Order', color: '#008000', type: 4},
  {text: 'Limit Order Cancel', color: '#E9C842', type: 2},
  {text: 'Transfer', color: '#81CA80', type: 5},
  {text: 'Account Create', color: '#B5B5B5', type: 6},
];

const constants = {
  API_URL: 'https://explorer.meta1.io:5000',
  OPS_TYPE_LABELS: [
    {text: 'Asset Price Publish', color: '#FF2A55', type: 58},
    {text: 'Limit Order Create', color: '#6BBCD7', type: 1},
    {text: 'Fill Order', color: '#008000', type: 4},
    {text: 'Limit Order Cancel', color: '#E9C842', type: 2},
    {text: 'Transfer', color: '#81CA80', type: 5},
    {text: 'Account Create', color: '#B5B5B5', type: 6},
  ],
};

export {OPS_TYPE_LABELS};

export default constants;
