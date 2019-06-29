import { createNamespaceProp } from 'utils'

import { reducerName } from './reducer';

const createProp = createNamespaceProp(reducerName);


export const players = createProp(['players']);

export const gameVisibility = createProp(['gameVisibility']);

export const cardsVisibility = createProp(['cardsVisibility']);

export const rooms = createProp(['rooms']);

