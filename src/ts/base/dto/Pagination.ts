export default interface Pagination<T> {
    entities: Record<string, T>;
    roots: string[];
    meta: {
        next_cursor: number;
        has_cursor: boolean;
        comments_count: number;
    };
}
