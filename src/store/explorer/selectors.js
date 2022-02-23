import get from 'lodash/get'

export const getOperationData = (state) => get(state, ['opData'])