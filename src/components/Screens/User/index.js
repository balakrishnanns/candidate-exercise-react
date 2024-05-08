import React, { useEffect, useState } from "react";
import "./style.scss";
import { MdEdit, MdDelete } from "react-icons/md";
import NormalButton from "../../common/NormalButton";
import { useNavigate } from "react-router-dom";
import { supabaseAnonKey, supabaseUrl } from "../../common/Utils";
import { createClient } from "@supabase/supabase-js";

export const User = () => {

    const navigate = useNavigate();
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const [datum, setDatum] = useState([])

    const getUserList = async () => {
        const { data, error } = await supabase.from("users").select();
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
    }, [])


    const deleteUser = async (userId) => {
        // console.log(userId)
        const { data, error } = await supabase
            .from("users")
            .delete()
            .eq("id", userId);
            getUserList()
    }


    return (
        <>

            <div className="user-page">
                <div className="row">
                    <div className="d-flex justify-content-between">
                        <div className="text-start userTitle">
                            users
                        </div>
                        <div>
                            <NormalButton label="Add User" onClick={() => navigate("/user/addUser")} />
                        </div>
                    </div>

                </div>
                <div>
                    <table className="w-100">
                        <thead>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {datum && datum?.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.email}</td>
                                        <td>
                                            <MdEdit size={"1.5em"} onClick={() => navigate(`/user/editUser/${item.id}`)}/>
                                            <MdDelete size={"1.5em"} onClick={() => deleteUser(item.id)} /></td>
                                    </tr>
                                )

                            })}

                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}