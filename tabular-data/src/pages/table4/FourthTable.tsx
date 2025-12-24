import {createColumnHelper, type SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable} from "@tanstack/react-table";
import {useState} from "react";

type IData = {
    distance: number,
    time: number,
    speed: number,
    person: string
}

const data: IData[] = [
    {distance: 15, time: 12, speed: 10, person: 'John'},
    {distance: 35, time: 18, speed: 20, person: 'Bob'},
    {distance: 42, time: 25, speed: 30, person: 'Alice'},
    {distance: 55, time: 32, speed: 40, person: 'Jane'},
    {distance: 68, time: 45, speed: 50, person: 'Kate'},
    {distance: 72, time: 51, speed: 60, person: 'Mary'},
    {distance: 88, time: 63, speed: 70, person: 'Peter'},
    {distance: 95, time: 78, speed: 80, person: 'Lisa'},
]

const columnHelper = createColumnHelper<IData>();

const columns = [
    columnHelper.accessor('distance', {
        header: 'Distance',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('time', {
        header: 'Time',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('speed', {
        header: 'Speed',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('person', {
        header: 'Person',
        cell: info => info.getValue()
    }),
]

const FourthTable = () => {

    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable<IData>({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <table className="m-30 w-200">
            <thead className="text-left bg-slate-200">
            {table.getHeaderGroups().map(headerGroup => (
                <tr className="" key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                                asc: ' 🔼',
                                desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                        </th>
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

export default FourthTable;