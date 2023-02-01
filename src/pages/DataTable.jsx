import React, { useState, useEffect, useMemo } from "react";
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    useFilters,
    usePagination,
} from "react-table";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "../components/Search";
import ColumnSearch from "../components/ColumnSearch";
import { Avatar } from "flowbite-react";

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
            Header: "Avatar",
            accessor: "avatar",
            Filter: ColumnSearch,
            disableFilters: true,
            Cell: ({ cell: { value } }) => <Avatar img={value} />,
        },
        {
            Header: "Name",
            accessor: "name",
            Filter: ColumnSearch,
        },
        {
            Header: "Email",
            accessor: "email",
            Filter: ColumnSearch,
        },
        {
            Header: "Subject",
            accessor: "subject",
            Filter: ColumnSearch,
        },
        {
            Header: "Category",
            accessor: "category",
            Filter: ColumnSearch,
        },
        {
            Header: "Message",
            accessor: "message",
            Filter: ColumnSearch,
        },
    ];

    const ColumnsAfterLogin = [
        {
            Header: "Action",
            Cell: ({ row }) => (
                <div>
                    <button
                        onClick={() =>
                            handleEdit(
                                row.original.id,
                                navigate(`/contact/edit/${row.original.id}`)
                            )
                        }
                        className="bg-yellow-200 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-full m-2"
                    >
                        Edit
                    </button>
                    <button
                        id={row.original.id}
                        onClick={handleDelete}
                        className="bg-red-300 hover:bg-red-500 text-black font-bold py-2 px-4 rounded-full m-2"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
        {
            Header: "Avatar",
            accessor: "avatar",
            Filter: ColumnSearch,
            disableFilters: true,
            Cell: ({ cell: { value } }) => <Avatar img={value} />,
        },
        {
            Header: "Name",
            accessor: "name",
            Filter: ColumnSearch,
        },
        {
            Header: "Email",
            accessor: "email",
            Filter: ColumnSearch,
        },
        {
            Header: "Subject",
            accessor: "subject",
            Filter: ColumnSearch,
        },
        {
            Header: "Category",
            accessor: "category",
            Filter: ColumnSearch,
        },
        {
            Header: "Message",
            accessor: "message",
            Filter: ColumnSearch,
        },
    ];

    const columns = useMemo(
        () => (user ? ColumnsAfterLogin : ColumnsBeforeLogin),
        [user]
    );
    const data = useMemo(() => contacts, [contacts]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 4 },
        },
        useGlobalFilter,
        useFilters,
        useSortBy,
        usePagination
    );

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <>
            <Search filter={globalFilter} setFilter={setGlobalFilter} />
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
                                        <div>
                                            {column.canFilter
                                                ? column.render("Filter")
                                                : null}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
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
            <div className="flex flex-col items-center mt-3">
                {/* Help text */}
                <span className="text-sm text-gray-700 dark:text-gray-700">
                    Page{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {pageIndex + 1}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {pageOptions.length}
                    </span>
                </span>
                <div>
                    {/* Jika ingin menambahkan custom page size */}
                    <span>
                        <input
                            onChange={(event) => {
                                const pageNumber = event.target.value
                                    ? Number(event.target.value) - 1
                                    : 0;
                                gotoPage(pageNumber);
                            }}
                            defaultValue={pageIndex + 1}
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                            placeholder="Go to Page"
                        />
                    </span>
                </div>
                <div className="inline-flex gap-1 mt-2 xs:mt-0">
                    {/* Buttons */}
                    <button
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-violet-400 rounded-lg hover:bg-violet-600  dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        {"<<"}
                    </button>
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-violet-400 rounded-lg  hover:bg-violet-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        {"< "}
                        Prev
                    </button>
                    <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white  bg-violet-400 rounded-lg hover:bg-violet-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        Next
                        {" >"}
                    </button>
                    <button
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-violet-400 rounded-lg hover:bg-violet-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        {">>"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default DataTable;
