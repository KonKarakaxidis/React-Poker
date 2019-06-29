import { createNamespaceAction } from 'utils';

const createAction = createNamespaceAction('SPINNER');


export const showSpinner = createAction('SHOW_SPINNER');

export const hideSpinner = createAction('HIDE_SPINNER');

