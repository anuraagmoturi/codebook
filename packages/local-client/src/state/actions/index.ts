import { ActionType } from '../action-types';
import { CellTypes } from '../cell';

export type Directions = 'up' | 'down';

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: 'up' | 'down'
  }
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: {
    id: string;
  }
}

export interface InsertCellAfter {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  }
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  }
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    id: string;
  }
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    id: string;
    bundle: {
      code: string;
      error: string;
    }
  }
}

export type Action =
  MoveCellAction
  | DeleteCellAction
  | InsertCellAfter
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction;