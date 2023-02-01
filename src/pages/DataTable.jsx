import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

const DataTable = ({ contacts, handleEdit, handleDelete }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        if (Cookies.get("token_user")) {
            if (user === undefined) {
                setUser(JSON.parse(Cookies.get("user")));
            }
        }
    }, []);

    const ColumnsBeforeLogin = [
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Subject",
            accessor: "subject",
        },
        {
            Header: "Category",
            accessor: "category",
        },
        {
            Header: "Message",
            accessor: "message",
        },
    ];

    const ColumnsAfterLogin = [
        {
            Header: "Aksi",
            Cell: ({ row }) => (
                <div>
                    <button
                        onClick={() =>
                            handleEdit(
                                row.original.id,
                                navigate(`/contact/edit/${row.original.id}`)
                            )
                        }
                        className="bg-yellow-200 hover:bg-yellow-400 text-white font-bold py-2 px-6 rounded-full m-2"
                    >
                        Edit
                    </button>
                    <button
                        id={row.original.id}
                        onClick={handleDelete}
                        className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-full m-2"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Subject",
            accessor: "subject",
        },
        {
            Header: "Category",
            accessor: "category",
        },
        {
            Header: "Message",
            accessor: "message",
        },
    ];

    const columns = useMemo(
        () => (user ? ColumnsAfterLogin : ColumnsBeforeLogin),
        [user]
    );
    const data = useMemo(() => contacts, [contacts]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data,
            },
            useSortBy
        );
    return (
        <>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table
                    className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                    {...getTableProps}
                >
                    <thead className="text-xs text-white uppercase bg-violet-400 dark:bg-gray-700 dark:text-gray-400">
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        scope="col"
                                        className="py-3 px-3"
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps()
                                        )}
                                    >
                                        {column.render("Header")}
                                        <span>
                                            {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <FontAwesomeIcon icon="fa-solid fa-sort-down" />
                                                ) : (
                                                    <FontAwesomeIcon icon="fa-solid fa-sort-up" />
                                                )
                                            ) : (
                                                ""
                                            )}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
                                    {...row.getRowProps()}
                                >
                                    {row.cells.map((cell) => {
                                        return (
                                            <td
                                                className="py-3 px-3"
                                                {...cell.getCellProps()}
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default DataTable;
