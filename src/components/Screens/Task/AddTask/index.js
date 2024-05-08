import React from "react";
import { NormalInput } from "../../../common/NormalInput";
import NormalButton from "../../../common/NormalButton";
import "./style.scss";
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "../../../common/Utils";
import { useNavigate } from "react-router-dom";

export const AddTask = () => {
    const { register, handleSubmit } = useForm();
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const navigate = useNavigate();

    const onSave = async (formData) => {
        let body = {
            ...formData
        };
        console.log(body)
        const { data, error } = await supabase.from("tasks").insert([body]);
        console.log(data, "adas")
        
            toast.success('Data saved successfully!')
           
       
        if (error) {
            console.log(error, "error");
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSave)}>
                <div className="adduser-page mt-5 p-4">
                    <div className="text-start mt-3">
                        <div className="adduserTxt mb-3">Add Task</div>
                    </div>
                    <div className="row">
                        <div className="col-6 my-2 text-left">
                            <label className="labelTxt float-left">Date</label>
                            <input type="date" className="inputBoxStyle" {...register("date", { required: true })} placeholder="Date" />
                        </div>
                        <div className="col-6 my-2 text-left">
                            <label className="labelTxt">Title</label>
                            <input className="inputBoxStyle" {...register("title", { required: true })} placeholder="Title" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 my-2 text-left">
                            <label className="labelTxt d-block text-left">Description</label>
                            <input className="inputBoxStyle" {...register("description", { required: true })} placeholder="Description" />
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-3 text-start mt-3">
                            <NormalButton label="Save" className="savebtn" type="submit" />
                        </div>
                    </div>
                </div>
            </form>
            <ToastContainer className="toast-position" position="top-right" />
        </>
    )
}