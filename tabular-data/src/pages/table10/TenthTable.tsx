import {
    createColumnHelper, flexRender,
    getCoreRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable
} from "@tanstack/react-table";
import {useState} from "react";

type IData = {
    title: string,
    author: string,
    year: number
    publisher: string,
    isbn: string,
    city: string
}

const data : IData[] = [
    {title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, publisher: 'Charles Scribner\'s Sons', isbn: '9780743273565', city: 'New York'},
    {title: 'Wuthering Hights', author: 'Emily Brontë', year: 1847, publisher: 'Thomas Cautley Newby', isbn: '9780141439561', city: 'London'},
    {title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, publisher: 'J. B. Lippincott & Co.', isbn: '9780061120084', city: 'New York'},
    {title: '1984', author: 'George Orwell', year: 1949, publisher: 'Secker & Warburg', isbn: '9780451524935', city: 'London'},
    {title: 'The Hobbit', author: 'Tolkien', year: 1937, publisher: 'Bloomsbury', isbn: '9780439016330', city: 'London'},
    {title: 'The Alchemist', author: 'J.K. Rowling', year: 1988, publisher: 'Bloomsbury', isbn: '9780345348567', city: 'London'},
    {title: 'The Lord of the Rings', author: 'Tolkien', year: 1954, publisher: 'Bloomsbury', isbn: '9780439016330', city: 'London'},
    {title: 'The Hunger Games', author: 'J.R.R. Tolkien', year: 2008, publisher: 'Bloomsbury', isbn: '9780345348567', city: 'London'},
    {title: 'The Chamber of Secrets', author: 'J.K. Rowling', year: 1998, publisher: 'Wiley', isbn: '9780345348567', city: 'London'},
]

const columnHelper = createColumnHelper<IData>()

const columns = [
    columnHelper.accessor('title', {
        header: 'Title',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('author', {
        header: 'Author',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('year', {
        header: 'Year',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('publisher', {
        header: 'Publisher',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('isbn', {
        header: 'ISBN',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('city', {
        header: 'City',
        cell: info => info.getValue()
    })
]

const TenthTable = () => {

    const [sorting, setSorting] = useState<SortingState>([])
    const table = useReactTable<IData>({
        data, columns, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), onSortingChange: setSorting,
        state: {
            sorting
        }
    })


    return (
        <div>
            <div>
                {table.getHeaderGroups().map(headerGroup => (
                    <div className="grid grid-cols-8 gap-4" key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <div className="col-span-1" key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {{
                                    asc: '↑',
                                    desc: '↓'
                                }[header.column.getIsSorted() as string] ?? null }
                            </div>
                        ))}
                    </div>
                    )

                )}
            </div>
            <div>
                {table.getRowModel().rows.map(row => (
                    <div className="grid grid-cols-8 gap-4" key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <div className="col-span-1" key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TenthTable;