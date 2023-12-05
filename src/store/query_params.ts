import { create } from 'zustand';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getQueryParameters } from '~/utils/get_query_parameters';
import { merge } from 'lodash';

type StoreState = {
    queryParams: Record<string, string>;
    setQueryParams: (queryParams: Record<string, string> | undefined) => void;
};

function getFromLocalStorage(): Record<string, string> {
    try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return JSON.parse(localStorage.getItem('queryParams')!) || {};
    } catch (err) {
        return {};
    }
}

function saveToLocalStorage(queryParams: Record<string, string> | undefined) {
    if (queryParams) {
        return localStorage.setItem('queryParams', JSON.stringify(queryParams));
    }
    return localStorage.removeItem('queryParams');
}

/**
 * The local/in-memory store.  Use this for "global" state (that is not coming
 * from react-query)
 */
export const useQueryParamsStore = create<StoreState>((set) => ({
    queryParams: getFromLocalStorage(),
    setQueryParams: (queryParams) => {
        return set(() => {
            saveToLocalStorage(queryParams);
            return { queryParams };
        });
    },
}));

export function useSaveQueryParams(): null {
    const location = useLocation();
    const urlQueryParams = getQueryParameters(location.search);
    const { queryParams, setQueryParams } = useQueryParamsStore();

    useEffect(() => {
        setQueryParams(merge({}, queryParams, urlQueryParams));
    }, []);

    return null;
}
