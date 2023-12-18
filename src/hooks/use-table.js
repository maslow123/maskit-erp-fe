/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useState } from "react"

export const useTable = (tableEndpoint, initialQuery) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [totalRows, setTotalRows] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [order, setOrder] = useState("asc")
    const [page, setPage] = useState(1)
    const [error, setError] = useState(1)
    const [query, setQuery] = useState(initialQuery)
    const [search, onSearch] = useState()

    const offset = (page - 1) * rowsPerPage;
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
            offset: offset,
            limit: rowsPerPage,
            order: order,
            ...query
        })
    }, [page, rowsPerPage, order, query])

    useEffect(() => {
        fetchData({
            offset: offset,
            limit: rowsPerPage,
            order: order,
            ...query
        })
    }, [page, rowsPerPage, order, query])

    useEffect(() => reload(), [])

    useEffect(() => {
        const getData = setTimeout(() => {
            setQuery((prevData) => ({ ...prevData, ...search }))
        }, 500)

        return () => clearTimeout(getData)
    }, [search])

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
        order,
        setOrder,
        onSearch,
        reload
    }
}