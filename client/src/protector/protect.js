import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";


export const AuthProtector =()=>{
    let {authUser} = useSelector((state)=>state.auth)
    return(
        authUser ? <Outlet/> : <Navigate to="/auth"/>
    )
};




export const PublicProtector =()=>{
    let {authUser} = useSelector((state)=>state.auth)
    return(
        !authUser ? <Outlet/> : <Navigate to="/"/>
    )
}