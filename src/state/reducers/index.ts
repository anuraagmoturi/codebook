import { combineReducers } from 'redux';
import CellReducer from './cell-reducer';
import BundleReducer from './bundle-reducer';

const reducers = combineReducers({
  cells: CellReducer,
  bundles: BundleReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;