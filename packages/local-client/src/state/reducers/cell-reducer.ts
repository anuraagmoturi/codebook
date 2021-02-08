import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell
  }
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {}
};

const reducer = produce((state: CellState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex >= 0 && targetIndex < state.order.length) {
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
      }
      return state;
    case ActionType.UPDATE_CELL:
      state.data[action.payload.id].content = action.payload.content;
      return state;
    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        id: randomId(),
        type: action.payload.type,
        content: ''
      };

      state.data[cell.id] = cell;
      const foundIdx = state.order.findIndex(id => id === action.payload.id);
      if (foundIdx !== -1)
        state.order.splice(foundIdx - 1, 0, cell.id)
      else
        state.order.unshift(cell.id);
      return state;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload.id];
      state.order = state.order.filter(id => id !== action.payload.id);
      return state;
    default:
      return state;
  }
});

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
}

export default reducer;