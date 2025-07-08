import React, { createContext, useContext } from 'react'

export const CanvasContext = createContext();

export const useCanvasHook = () => {
    const context = useContext(CanvasContext);
    if(!context){
        throw new Error('useCanvasHook must be used within a CanvasContext.Provider');
    }
    return context;
};