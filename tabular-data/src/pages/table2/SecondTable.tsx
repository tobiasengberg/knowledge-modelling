import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";


type IData = {
    title: string,
    author: string,
    year: number
}

const data: IData[] = [
    {
        title: 'The Hobbit',
        author: 'Tolkien',
        year: 1937
    },
    {
        title: 'The Lord of the Rings',
        author: 'Tolkien',
        year: 1954
    }
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
    })
]

const SecondTable = () => {

    const table = useReactTable<IData>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        initialState: {
            columnOrder: ['author', 'year', 'title']
        }
    })
    return (
        <div>
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
            </table>
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
        </div>
    );
};

export default SecondTable;