
interface ListProps<T> {
    className?: string;
    items: T[];
    renderItem  : (item: T) => React.ReactNode;
}

export function List<T>(props: ListProps<T>) {
    return (
        <div className={props.className}>
            {props.items.map(props.renderItem)}
        </div>
    );
}