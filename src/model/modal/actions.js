import { createNamespaceAction } from 'utils';

const createAction = createNamespaceAction('MODAL');


export const openModal = createAction('OPEN_MODAL');

export const closeModal = createAction('CLOSE_MODAL');

