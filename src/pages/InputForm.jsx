import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const InputForm = ({ input, handleSubmit }) => {
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        subject: Yup.string().required("Subject is required"),
        category: Yup.string().required("Category is required"),
        message: Yup.string().required("Message is required"),
    });

    const formik = useFormik({
        initialValues: input,
        validationSchema,
        onSubmit: (values) => {
            handleSubmit(values, navigate("/"));
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="w-4/5 mx-auto mb-5">
                <div className="mb-6">
                    <input
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        name="name"
                        type="text"
                        className={
                            formik.errors.name && formik.touched.name
                                ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }
                        placeholder="Masukkan nama..."
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <p className="text-red-500">{formik.errors.name}</p>
                    ) : null}
                </div>
                <div className="mb-6">
                    <input
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        name="email"
                        type="email"
                        className={
                            formik.errors.email && formik.touched.email
                                ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }
                        placeholder="Masukkan email..."
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <p className="text-red-500">{formik.errors.email}</p>
                    ) : null}
                </div>
                <div className="mb-6">
                    <input
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        name="subject"
                        type="text"
                        className={
                            formik.errors.subject && formik.touched.subject
                                ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }
                        placeholder="Masukkan subject..."
                    />
                    {formik.errors.subject && formik.touched.subject ? (
                        <p className="text-red-500">{formik.errors.subject}</p>
                    ) : null}
                </div>
                <div className="mb-6">
                    <select
                        id="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        name="category"
                        className={
                            formik.errors.category && formik.touched.category
                                ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }
                    >
                        <option value="none">Pilih category...</option>
                        <option value="su">Support</option>
                        <option value="cs">Customer Service</option>
                        <option value="hr">Human Resource</option>
                    </select>
                    {formik.errors.category && formik.touched.category ? (
                        <p className="text-red-500">{formik.errors.category}</p>
                    ) : null}
                </div>
                <div className="mb-6">
                    <textarea
                        value={formik.values.message}
                        rows="4"
                        onChange={formik.handleChange}
                        name="message"
                        type="text"
                        className={
                            formik.errors.message && formik.touched.message
                                ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }
                        placeholder="Masukkan message..."
                    />
                    {formik.errors.message && formik.touched.message ? (
                        <p className="text-red-500">{formik.errors.message}</p>
                    ) : null}
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default InputForm;
