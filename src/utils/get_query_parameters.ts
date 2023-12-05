export function getQueryParameters(search: string) {
    const params: Record<string, string> = {};
    const queryString = search.substring(1);

    if (queryString) {
        const pairs = queryString.split('&');

        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split('=');
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
    }

    return params;
}
