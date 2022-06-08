import React from 'react';
import axios from 'axios';
import store from '../store';

const UseAsset = async (assetId) => {
  // eslint-disable-next-line no-undef
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const EXPLORER_URL = BASE_URL + '/explorer';
  const state = store.getState();
  const activeAssets = state.explorer?.assets?.active_assets;
  if (activeAssets) {
    const assets = activeAssets.map((item) => {
      const { asset } = item;
      return {
        data: asset,
      };
    });
    const filteredAssets = assets.filter(
      (asset) => asset.data.id === assetId || asset.data.symbol === assetId,
    );
    if (filteredAssets.length) {
      return Promise.resolve(filteredAssets[0]);
    } else {
      return await axios.get(EXPLORER_URL + '/asset?asset_id=' + assetId);
    }
  } else {
    return await axios.get(EXPLORER_URL + '/asset?asset_id=' + assetId);
  }
};

export default UseAsset;
