import { createContextualCan } from '@casl/react';
import React from 'react';
import { createUserAbility } from './casl';

export const CaslContext = React.createContext(createUserAbility());
export const Can = createContextualCan(CaslContext.Consumer);
