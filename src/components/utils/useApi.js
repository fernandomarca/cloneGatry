import { useState } from 'react';
import axios from 'axios';

import useDebouncedPromise from 'components/utils/useDebouncedPromise';

const initialRequestInfo = {
    error: null,
    data: null,
    loading: false
}

export default function useApi(config) {

    const [requestInfo, setRequestInfo] = useState(initialRequestInfo);

    const debouncedAxios = useDebouncedPromise(axios, config.debounceDelay);

    async function call(localConfig) {
        setRequestInfo({
            ...initialRequestInfo,
            loading: true
        });

        let response = null;

        const finalconfig = {
            baseURL: 'http://localhost:3333',
            updateRequestInfo: newInfo => newInfo,
            ...config,
            ...localConfig,
        }

        if (finalconfig.isFetchMore) {
            setRequestInfo({
                ...initialRequestInfo,
                data: requestInfo.data,
                loading: true,
            })
        } else if (!finalconfig.quietly) {
            setRequestInfo({
                ...initialRequestInfo,
                loading: true,
            })
        }

        const fn = finalconfig.debounced ? debouncedAxios : axios;

        try {
            response = await fn(finalconfig);

            const newRequestInfo = {
                ...initialRequestInfo,
                data: response.data
            }

            if (response.headers['x-total-count'] !== undefined) {
                newRequestInfo.total = Number.parseInt(response.headers['x-total-count'], 10);
            }

            setRequestInfo(finalconfig.updateRequestInfo(newRequestInfo, requestInfo));
        } catch (error) {
            setRequestInfo(finalconfig.updateRequestInfo({
                ...initialRequestInfo,
                error: error
            }, requestInfo));
        }

        if (config.onCompleted) {
            config.onCompleted(response);
        }
    }

    return [
        call,
        requestInfo
    ]
}