/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useState } from "react"

export const useTable = (tableEndpoint, initialQuery) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [totalRows, setTotalRows] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(1)
    const [error, setError] = useState(1)
    const [query, setQuery] = useState(initialQuery)

    const fetchData = async (query) => {
        setLoading(true)
        try {
            const res = await tableEndpoint(query)
            setData(res.data)
            setTotalRows(res.data.total_count)
        } catch (e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }

    const reload = useCallback(() => {
        fetchData({
            offset: page,
            limit: rowsPerPage,
            ...query
        })
    }, [page, rowsPerPage, query])

    useEffect(() => {
        fetchData({
            offset: page,
            limit: rowsPerPage,
            ...query
        })
    }, [page, rowsPerPage, query])

    useEffect(() => reload(), [])

    return {
        data,
        setData,
        error,
        setError,
        loading,
        setLoading,
        totalRows,
        setTotalRows,
        rowsPerPage,
        setRowsPerPage,
        page,
        setPage,
        query,
        setQuery,
        reload
    }
}