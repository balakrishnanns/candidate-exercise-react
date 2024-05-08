import React, { useEffect } from "react";
import { NormalInput } from "../../../common/NormalInput";
import NormalButton from "../../../common/NormalButton";
import "./style.scss";
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "../../../common/Utils";
import { useNavigate, useParams } from "react-router-dom";

export const EditUser = () => {
    const { register, handleSubmit, reset } = useForm();
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const params = useParams();

    const { id } = params;
    const navigate = useNavigate();
    // console.log(id, "ppp")

    const getParticularList = async () => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id);
        console.log(data)
        reset({ name: data?.[0]?.name, email: data?.[0]?.email, mobileNumber: data?.[0]?.mobileNumber });

    }

    useEffect(() => {
        getParticularList();
    }, [])

    const onSave = async (formData) => {
        console.log(formData)
        const { data, error } = await supabase
            .from("users")
            .update(formData)
            .eq("id", id);
            navigate('/user')
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSave)}>
                <div className="adduser-page mt-5 pt-3">
                    <div className="text-start mt-3">
                        <div className="adduserTxt mb-3">Edit User</div>
                    </div>
                    <div className="row">
                        <div className="col-6 my-2 text-left">
                            <label className="labelTxt float-left">Name</label>
                            <input className="inputBoxStyle" {...register("name", { required: true })} placeholder="First name" />
                        </div>
                        <div className="col-6 my-2 text-left">
                            <label className="labelTxt">Email</label>
                            <input className="inputBoxStyle" {...register("email", { required: true })} placeholder="Email" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 my-2 text-left">
                            <label className="labelTxt d-block text-left">Mobile Number</label>
                            <input className="inputBoxStyle" {...register("mobileNumber", { required: true })} placeholder="Mobile Number" />
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-3 text-start mt-3">
                            <NormalButton label="Save" className="savebtn" type="submit" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}