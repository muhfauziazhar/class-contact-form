import React, { Component } from "react";
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

library.add(fas);

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDark:
                localStorage.getItem("color-theme") === "dark" ||
                (!("color-theme" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches),
            user: undefined,
        };
    }

    componentDidMount() {
        this.updateColorTheme();

        if (Cookies.get("token_user")) {
            if (this.state.user === undefined) {
                this.setState({ user: JSON.parse(Cookies.get("user")) });
            }
        }
    }

    componentDidUpdate() {
        this.updateColorTheme();
    }

    updateColorTheme = () => {
        if (this.state.isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    handleClick = () => {
        this.setState((prevState) => ({
            isDark: !prevState.isDark,
        }));
        localStorage.setItem(
            "color-theme",
            this.state.isDark ? "light" : "dark"
        );
        this.updateColorTheme();
    };

    handleLogout = () => {
        Cookies.remove("token_user");
        Cookies.remove("user");
        window.location = "/";
    };

    render() {
        return (
            <div>
                <Navbar fluid={true} rounded={false}>
                    <Navbar.Brand href="/">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="mr-3 h-6 sm:h-9"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            Erasys Contact
                        </span>
                    </Navbar.Brand>
                    <button
                        id="theme-toggle"
                        type="button"
                        onClick={this.handleClick}
                        className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                    >
                        <FontAwesomeIcon
                            icon={["fas", "sun"]}
                            className={this.state.isDark ? "" : "hidden"}
                        />
                        <FontAwesomeIcon
                            icon={["fas", "moon"]}
                            className={this.state.isDark ? "hidden" : ""}
                        />
                    </button>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link
                                    to={"/"}
                                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                                    aria-current="page"
                                >
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/news"}
                                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                                    aria-current="page"
                                >
                                    Berita
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/contact/add"}
                                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                >
                                    Tambah Kontak
                                </Link>
                            </li>
                            {this.state.user ? (
                                <li>
                                    <span
                                        onClick={this.handleLogout}
                                        className="cursor-pointer block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Logout
                                    </span>
                                </li>
                            ) : (
                                <li>
                                    <Link
                                        to={"/auth/user-login"}
                                        className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navigation;
