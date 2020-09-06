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
            ...localConfig,
            ...config
        }

        const fn = finalconfig.debounced ? debouncedAxios : axios;

        try {
            response = await fn(finalconfig);

            setRequestInfo({
                ...initialRequestInfo,
                data: response.data
            });
        } catch (error) {
            setRequestInfo({
                ...initialRequestInfo,
                error: error
            });
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