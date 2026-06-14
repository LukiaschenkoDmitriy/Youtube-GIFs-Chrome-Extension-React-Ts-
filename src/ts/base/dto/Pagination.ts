export default interface Pagination<T> {
    entities: T[]
    meta: {
        next_cursor: number;
        has_cursor: boolean;
        comments_count: number;
    }
}