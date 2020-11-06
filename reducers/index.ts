import recost from 'recost'

import previewReducer, { IStatePreview, initialState as previewInitialState } from './preview'

const initialState = {
  ...previewInitialState,
}

const reducers = [
  previewReducer,
]

const middlewares = []

export interface IState extends IStatePreview {} 

const { 
  dispatch,
  withState,
  useSelector,
  Provider,
} = recost<IState>(initialState, reducers, middlewares)

export {
  withState,
  useSelector,
  Provider,
  dispatch,
}
