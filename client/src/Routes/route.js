import { Component } from "react";
import MemesPage from "../Pages/Memes";
import Login from "../Pages/Login";
import Account from "../Pages/Account";
import MemePage from "../Pages/MemePage";
import Registration from "../Pages/Registration";

export const privateRouts = [
    {path: '/memes', Component: MemesPage, exact:true},
    {path: '/account', Component: Account, exact:true},
    {path: '/memes/:id', Component: MemePage, exact: true }
]

export const publicRouts = [
    {path: '/login', Component: Login, exact:true},
    {path: '/registration', Component: Registration, exact:true},
]