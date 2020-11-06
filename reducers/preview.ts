
import { IAction, IBaseState } from 'recost'

export interface IStatePreview extends IBaseState {
  preview: boolean
}

export default function reducer(state: IStatePreview, action: IAction) {
  if (action.type === 'SET_PREVIEW') {
    console.log('action', action.type, action.payload)
    return {
      ...state,
      preview: action.payload
    }
  }

  return state
}

export const initialState = {
  preview: false
}