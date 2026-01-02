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
}

const data : IData[] = [
    {title: 'The Hobbit', author: 'Tolkien', year: 1937},
    {title: 'The Lord of the Rings', author: 'Tolkien', year: 1954},
    {title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', year: 1997},
    {title: 'The Alchemist', author: 'J.K. Rowling', year: 1988},
    {title: 'The Chamber of Secrets', author: 'J.K. Rowling', year: 1998},
    {title: 'The Goblet of Fire', author: 'J.K. Rowling', year: 1998},
    {title: 'The Order of the Phoenix', author: 'J.K. Rowling', year: 1998},
    {title: 'The Half-Blood Prince', author: 'J.K. Rowling', year: 1999},
    {title: 'The Deathly Hallows', author: 'J.K. Rowling', year: 2003},
    {title: 'The Lord of the Rings: The Return of the King', author: 'J.K. Rowling', year: 2003},
    {title: 'The Lord of the Rings: The Fellowship of the Ring', author: 'J.K. Rowling', year: 2001},
    {title: 'The Lord of the Rings: The Two Towers', author: 'J.K. Rowling', year: 2002},
]

const columnHelper = createColumnHelper<IData>();

const columns = [
    columnHelper.accessor('title', {
        cell: info => info.getValue(),
        header: 'Title'
    }),
    columnHelper.accessor('author', {
        cell: info => info.getValue(),
        header: 'Author'
    }),
    columnHelper.accessor('year', {
        cell: info => info.getValue(),
        header: 'Year'
    })
];

const SixthTable = () => {
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
            <div>
                {table.getHeaderGroups().map(headerGroup => (
                    <div  className="grid grid-cols-3"  key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <div key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {{
                                    asc: ' 🔼',
                                    desc: ' 🔽',
                                }[header.column.getIsSorted() as string] ?? null}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div>
                {table.getRowModel().rows.map(row => (
                    <div className="grid grid-cols-3" key={row.id}>
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

export default SixthTable;