import { useEffect, useMemo } from "react"

export const useSearch = (query, memes) => {
    const searchPost = useMemo(() => {
        return memes.filter(meme => meme.title.toLowerCase().includes(query.toLowerCase()))
    }, [memes, query]);
    return searchPost
}
export const useSort = (arrive, sort, query) => {

    const SortMeme = useSearch(query, arrive)

    const sortedMeme = useMemo(() => {
      if (sort === 'new'){
          return SortMeme
        } else if(sort === 'old') {
            return [...SortMeme].reverse()
        } else if (sort ==='popular'){
            return [...SortMeme].sort((a, b) => b.like - a.like);
        }
        return SortMeme
     } , [SortMeme, sort]);

    return sortedMeme;
}