import React, { useEffect } from "react";
import { NormalInput } from "../../../common/NormalInput";
import NormalButton from "../../../common/NormalButton";
import "./style.scss";
import { useForm } from 'react-hook-form';
import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "../../../common/Utils";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EditTask = () => {
    const { register, handleSubmit, reset } = useForm();
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const params = useParams();

    const { id } = params;
    const navigate = useNavigate();
    // console.log(id, "ppp")

    const getParticularList = async () => {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('id', id);
        console.log(data)
        reset({ date: moment(data?.[0]?.date).format("YYYY-MM-DD"), title: data?.[0]?.title, description: data?.[0]?.description });

    }

    useEffect(() => {
        getParticularList();
    }, []);

    const onSave = async (formData) => {
        const { data, error } = await supabase
            .from("tasks")
            .update(formData)
            .eq("id", id);
            toast.success('Data Updated successfully!')
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSave)}>
                <div className="adduser-page mt-5 p-4">
                    <div className="text-start mt-3">
                        <div className="adduserTxt mb-3">Edit Task</div>
                    </div>
                    <div className="row">
                        <div className="col-6 my-2 text-left">
                            <label className="labelTxt float-left">date</label>
                            <input className="inputBoxStyle" type="date" {...register("date", { required: true })} placeholder="Date" />
                        </div>
                        <div className="col-6 my-2 text-left">
                            <label className="labelTxt">Title</label>
                            <input className="inputBoxStyle" {...register("title", { required: true })} placeholder="Title" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 my-2 text-left">
                            <label className="labelTxt d-block text-left">Description</label>
                            <input className="inputBoxStyle" {...register("description", { required: true })} placeholder="description" />
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