import {
    useReactTable,
    getCoreRowModel,
    flexRender, createColumnHelper,
} from "@tanstack/react-table";

type IData = {
    id: number,
    name: string,
    age: number
}

const data: IData[] = [
    {id: 1, name: 'John', age: 30},
    {id: 2, name: 'Bob', age: 25},
    {id: 3, name: 'Alice', age: 20},
]

const columnHelper = createColumnHelper<IData>();

const columns =
    [
        columnHelper.accessor("id",         {
            header: 'Id',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("name",         {
            header: 'Name',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("age",         {
            header: 'Age',
            cell: (info) => info.getValue(),
        })
    ]


export const FirstTable = () => {



    const table = useReactTable<IData>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    return (
        <div className="m-20">
            <h1 className="text-3xl">First table</h1>
            <div>
                <table className="border-collapse w-120">
                    <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th className="py-3 text-left" key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FirstTable;