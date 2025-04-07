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
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index}
                        onClick={() => paginate(index + 1)}
                        active={currentPage === index + 1}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>
    );
};

export {PaginationSection};