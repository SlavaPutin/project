import { useEffect, useMemo } from "react"

export const useSearch = (query, users) => {
    const searchPost = useMemo(() => {
        return users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
    }, [users, query]);
    return searchPost
}