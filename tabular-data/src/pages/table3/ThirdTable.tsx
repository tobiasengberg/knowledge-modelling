import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";

type IData = {
    title: string,
    author: string,
    year: number,
    publisher: string
}

const data: IData[] = [
    { title: 'Madagaskar', author: 'Bernard Hepton', year: 2022, publisher: 'Routledge' },
    { title: 'Farrah Jane', author: 'Michael Kitchen', year: 1999, publisher: 'Wiley'},
    { title: 'The Hobbit', author: 'Tolkien', year: 1937, publisher: 'Bloomsbury'},
    { title: 'The Lord of the Rings', author: 'Tolkien', year: 1954, publisher: 'Bloomsbury'},
    { title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', year: 1997, publisher: 'Bloomsbury'},
    { title: 'The Alchemist', author: 'J.K. Rowling', year: 1988, publisher: 'Bloomsbury'},
    { title: 'The Chamber of Secrets', author: 'J.K. Rowling', year: 1998, publisher: 'Bloomsbury'},
    { title: 'The Goblet of Fire', author: 'J.K. Rowling', year: 1998, publisher: 'Bloomsbury'},
    { title: 'The Order of the Phoenix', author: 'J.K. Rowling', year: 1998, publisher: 'Bloomsbury'},
    { title: 'The Half-Blood Prince', author: 'J.K. Rowling', year: 1999, publisher: 'Bloomsbury'},
    { title: 'The Deathly Hallows', author: 'J.K. Rowling', year: 2003, publisher: 'Bloomsbury'},
    { title: 'The Lord of the Rings: The Return of the King', author: 'J.K. Rowling', year: 2003, publisher: 'Bloomsbury'},
    { title: 'The Lord of the Rings: The Fellowship of the Ring', author: 'J.K. Rowling', year: 2001, publisher: 'Bloomsbury'},
    { title: 'The Lord of the Rings: The Two Towers', author: 'J.K. Rowling', year: 2002, publisher: 'Bloomsbury'},

]

const ThirdTable = () => {

    const columnHelper = createColumnHelper<IData>();
    const columns = [
        columnHelper.accessor('title', {
            header: 'Title',
            cell: info => info.getValue(),
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor('author', {
            header: 'Author',
            cell: info => info.getValue(),
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor('year', {
            header: 'Year',
            cell: info => info.getValue(),
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor('publisher', {
            header: 'Publisher',
            cell: info => info.getValue(),
            sortingFn: 'alphanumeric',
        }),
    ]

    const table = useReactTable<IData>({
        data,
        columns,

        getCoreRowModel: getCoreRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
            sorting: [
                { id: 'author', desc: false}
            ],
        },
        getSortedRowModel: getSortedRowModel(),
    })
    return (
        <table>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ThirdTable;