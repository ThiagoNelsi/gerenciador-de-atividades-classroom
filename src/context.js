import { createContext, useState } from 'react';

function Context({ children }) {

  export const context = createContext();

  const state = {};

  return <context.Provider value={state}>{children}</context.Provider>

}
