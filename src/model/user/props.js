import { createNamespaceProp } from 'utils'

import { reducerName } from './reducer';

const createProp = createNamespaceProp(reducerName);

export const user = createProp();


