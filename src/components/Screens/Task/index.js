import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import "./style.scss";
import NormalButton from "../../common/NormalButton";
import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "../../common/Utils";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { SearchInput } from "../../common/SearchInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from 'react-bootstrap';

export const TaskManagement = () => {
    const navigate = useNavigate();
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const [datum, setDatum] = useState([])
    const [search, setSearch] = useState("")
    const [show, setShow] = useState(false)
    const [filterValue, setFilterValue] = useState("")

    const getUserList = async () => {
        const { data, error } = await supabase.from("tasks").select();
        console.log(data, "data")
        if (data.length > 0) {
            setDatum(data);
        } else {
            // setErr(error);
            setDatum([]);
            console.log(error)
        }
    }
    useEffect(() => {
        getUserList()
    }, [search])


    const deleteUser = async (userId) => {
        // console.log(userId)
        const { data, error } = await supabase
            .from("tasks")
            .delete()
            .eq("id", userId);
        toast.success('Data saved successfully!')
        getUserList()
    }


    const handleSearch = async (val) => {
        const searchTerm = val.trim().toLowerCase();
        setSearch(searchTerm)
        console.log(searchTerm)
        const { data: searchData, error: searchError } = await supabase
            .from('tasks')
            .select()
            .ilike('title', `%${searchTerm}%`);
        if (searchData && searchData.length > 0) {
            setDatum(searchData);
        } else {
            setDatum([]);
        }
    }

    const filterChange = async () => {
        if (filterValue) {
            const { data: filterData, error: searchError } = await supabase
                .from('tasks')
                .select()
                .filter('date', 'eq', filterValue);
    
            if (filterData) {
                setDatum(filterData);
            } else {
                setDatum([]);
            }
        } else {
            getUserList();
        }
        setShow(false);
    }

    useEffect(() => {

    }, [filterValue])


    return (
        <>
            <div className="Taskmanagement-page mt-3 p-4">
                <div className="row mb-3 pb-3">
                    <div className="col-10">
                        <div className="text-start userTitle">
                            Task Management
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="">
                            <div>
                                <NormalButton label="Add Task" className="primary-btn" onClick={() => navigate("/Task-Management/addTask")} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="serchArea my-3 ">
                    <div className="row">
                        <div className="col-6">
                            <div className="col-4">
                                <div className="text-start">
                                    <SearchInput
                                        placeholder={"Search"}
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="col-4 filterarea">
                                <div>
                                    <NormalButton label="Filter" className="filterBtn" onClick={() => setShow(true)} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <table className="w-100">
                        <thead>
                            <th>S.No</th>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </thead>

                        <tbody>
                            {datum?.length > 0 ? <>
                                {datum && datum?.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{moment(item?.date).format("DD-MMM-YYYY")}</td>
                                            <td>{item?.title}</td>
                                            <td>{item?.description}</td>
                                            <td>
                                                <MdEdit size={"1.5em"} onClick={() => navigate(`/Task-Management/editTask/${item.id}`)} />
                                                <MdDelete size={"1.5em"} onClick={() => deleteUser(item.id)} /></td>
                                        </tr>
                                    )

                                })}
                            </> : <>
                                <div className="text-center">
                                    <span>No Record Found</span>
                                </div>
                            </>}


                        </tbody>
                    </table>
                </div>

            </div>
            <ToastContainer className="toast-position" position="top-right" />
            <div>
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Filter</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <input className="inputBoxStyle" type="date" onChange={(e) => setFilterValue(e.target.value)} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>Close Modal</Button>
                        <Button variant="primary" onClick={filterChange}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}