import { Outlet } from 'react-router-dom';
import { useSaveQueryParams } from './store/query_params';

/**
 * Future stuff...
 */
export default function Setup() {
    useSaveQueryParams();
    return <Outlet />;
}
