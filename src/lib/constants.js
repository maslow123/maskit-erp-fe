import { createTheme } from "react-data-table-component";

const status = {
    OK: 200,
    Created: 201,
    BadRequest: 400,
    NotFound: 404
};

const user_levels = [
    {
        label: 'Admin',
        value: 'Admin',
    },
    {
        label: 'Purchasing',
        value: 'Purchasing'
    },
    {
        label: 'Finance',
        value: 'Finance'
    },
    {
        label: 'Gudang',
        value: 'Gudang'
    },
    {
        label: 'Operator',
        value: 'Operator'
    }
]
export { status, user_levels };