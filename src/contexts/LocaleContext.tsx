'use client';

import { createContext, useContext, Dispatch, SetStateAction } from 'react';

type LocaleContextType = {
    locale: string;
    setLocale: Dispatch<SetStateAction<string>>;
};

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function useLocale() {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
}
