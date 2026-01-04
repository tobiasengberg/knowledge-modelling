import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel, type RowData,
    type SortingState,
    useReactTable
} from "@tanstack/react-table";
import {useState} from "react";

type IData = {
    title: string,
    author: string,
    year: number,
    publisher: string,
    isbn: string
}

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void
    }
}

const data : IData[] = [
    {title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, publisher: 'Charles Scribner\'s Sons', isbn: '9780743273565'},
    {title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, publisher: 'J. B. Lippincott & Co.', isbn: '9780061120084'},
    {title: 'The Lord of the Rings', author: 'Tolkien', year: 1954, publisher: 'Bloomsbury', isbn: '9780439016330'},
    {title: 'The Alchemist', author: 'J.K. Rowling', year: 1988, publisher: 'Bloomsbury', isbn: '9780345348567'},
    {title: '1984', author: 'George Orwell', year: 1949, publisher: 'Secker & Warburg', isbn: '9780451524935'},
    {title: 'The Hobbit', author: 'Tolkien', year: 1937, publisher: 'Bloomsbury', isbn: '9780439027577'}
]

const columnHeleper = createColumnHelper<IData>();

const columns = [
    columnHeleper.accessor('title', {
        header: 'Title',
        cell: info => info.getValue()
    }),
    columnHeleper.accessor('author', {
        header: 'Author',
        cell: info => info.getValue()
    }),
    columnHeleper.accessor('year', {
        header: 'Year',
        cell: info => info.getValue()
    }),
    columnHeleper.accessor('publisher', {
        header: 'Publisher',
        cell: info => info.getValue()
    }),
    columnHeleper.accessor('isbn', {
        header: 'ISBN',
        cell: info => info.getValue()
    }),
]

const SeventhTable = () => {
    const [sorting, setSorting] = useState<SortingState>([])
    const table = useReactTable<IData>({
        data,
        columns,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    
    return (
        <div>
            <button onClick={() => {console.log(table)}}>Click</button>
            <div>
                {table.getHeaderGroups().map(headerGroup => (
                    <div className="grid grid-cols-5 gap-4" key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <div key={header.id} onClick={header.column.getToggleSortingHandler()} className="cursor-pointer">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {{
                                    asc: '',
                                    desc: ''
                                }[header.column.getIsSorted() as string] ?? null }
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div>
                {table.getRowModel().rows.map(row => (
                    <div className="grid grid-cols-5 gap-4" key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <div key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeventhTable;