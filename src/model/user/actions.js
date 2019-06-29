import { createNamespaceAction } from 'utils';

const createAction = createNamespaceAction('');


export const updateClient = createAction('UPDATE_CLIENT');

export const updateUser = createAction('UPDATE_USER');

