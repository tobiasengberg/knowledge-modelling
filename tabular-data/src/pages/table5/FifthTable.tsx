import {
    createColumnHelper,
    flexRender,
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
}

const data : IData[] = [
    {title: 'The Hobbit', author: 'Tolkien', year: 1937},
    {title: 'The Lord of the Rings', author: 'Tolkien', year: 1954},
    {title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', year: 1997},
]

const columnHelper = createColumnHelper<IData>();

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
]

const FifthTable = () => {
    const [sorting, setSorting] = useState<SortingState>([])
    const table = useReactTable<IData>({
        columns,
        data,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="m-20">
            <div >
                {table.getHeaderGroups().map(headerGroup => (
                    <div className="grid grid-cols-3 gap-4" key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <div key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {{
                                    asc: '↑',
                                    desc: '↓'
                                }[header.column.getIsSorted() as string] ?? null }
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div>
                {table.getRowModel().rows.map(row => (
                    <div className="grid grid-cols-3 gap-4" key={row.id}>
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

export default FifthTable;