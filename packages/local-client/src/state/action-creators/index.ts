import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import {
  UpdateCellAction, DeleteCellAction,
  InsertCellAfter, MoveCellAction, Directions,
  Action
} from '../actions';
import { CellTypes } from '../cell';
import bundle from '../../bundler';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content
    }
  }
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: {
      id
    }
  }
};

export const moveCell = (id: string, direction: Directions): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction
    }
  }
};

export const insertCellAfter = (id: string | null, type: CellTypes): InsertCellAfter => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type
    }
  }
};

export const createBundle = (id: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        id: id
      }
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        id,
        bundle: result
      }
    })
  }
}