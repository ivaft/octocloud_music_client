import * as SecureStore from 'expo-secure-store';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type UseSecureStorageReturn = [string | undefined, Dispatch<SetStateAction<string | undefined>>, () => void];

const useSecureStorage = (key: string): UseSecureStorageReturn => {
    const [value, setValue] = useState<string | undefined>(SecureStore.getItem(key) ?? undefined);

    const saveToStorage = () => {
        if (value !== undefined) SecureStore.setItem(key, value);
    }


    return [value, setValue, saveToStorage];
};

export default useSecureStorage;