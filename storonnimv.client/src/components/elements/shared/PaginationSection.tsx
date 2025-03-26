import {FC} from "react";
import {Container, Pagination} from "react-bootstrap";

interface IPaginationSectionProps {
    className: string;
    currentPage: number;
    totalPages: number;
    paginate: (pageNumber: number, pageSize?: number) => void;
}

const PaginationSection: FC<IPaginationSectionProps> = ({className, currentPage, totalPages, paginate}) => {
    return (
        <Container>
            <Pagination className={className}>
                {/* Кнопка "Предыдущая страница" */}
                <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                />

                {/* Кнопки с номерами страниц */}
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index}
                        onClick={() => paginate(index + 1)}
                        active={currentPage === index + 1}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}

                {/* Кнопка "Следующая страница" */}
                <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </Container>
    );
};

export {PaginationSection};