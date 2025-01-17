import {ListGroup} from "react-bootstrap";

interface ListProps<T> {
    className?: string;
    items: T[];
    renderItem  : (item: T) => React.ReactNode;
}

export function List<T>(props: ListProps<T>) {
    return (
        <ListGroup className={props.className}>
            {props.items.map(props.renderItem)}
        </ListGroup>
    );
}