import get from 'lodash/get'

export const getOperationData = (state) => get(state, ['explorer', 'operations', 'op_data']);
export const isFetchingLastOperations = (state) => get(state, ['explorer', 'operations', 'isFetchingLastOperations']);
export const getHeaderData = (state) => get(state, ['explorer', 'header', 'header_data']);
export const isFetchingHeader = (state) => get(state, ['explorer', 'header', 'isFetchingHeader']);