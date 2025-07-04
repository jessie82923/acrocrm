import { useState, useEffect } from 'react';

/**
 * 通用列表 hook，支援初始 fetch、刪除、更新、建立
 * @param fetchList 取得列表的 API 函式
 * @returns { items, setItems, addItem, updateItem, removeItem, loading, error }
 */
export function useList<T>(fetchList: () => Promise<T[]>) {
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchList()
            .then(setItems)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [fetchList]);

    const addItem = (item: T) => setItems(list => [...list, item]);
    const updateItem = (item: T, match: (a: T, b: T) => boolean) =>
        setItems(list => list.map(i => match(i, item) ? item : i));
    const removeItem = (item: T, match: (a: T, b: T) => boolean) =>
        setItems(list => list.filter(i => !match(i, item)));

    return { items, setItems, addItem, updateItem, removeItem, loading, error };
}
