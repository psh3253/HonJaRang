// import React from 'react'
import { useParams } from 'react-router-dom';
import UserInfo from '../../components/MyPage/UserInfo';
import SideBar from '../../components/MyPage/SideBar';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Userinfo } from '../../redux/slice/UserInfoSlice';

export default function MyPage() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const token = localStorage.getItem("access_token")
  useEffect(() => {
    console.log(id)
    console.log(token)
    axios.get(`${import.meta.env.VITE_APP_API}/api/v1/users/info`,
      {
        params : {id : id},
        headers : {'Authorization' : `Bearer ${token}`}
      },
      )
      .then(function(response){
        console.log(response.data)
        dispatch(Userinfo(response.data))
      })
      .catch(function(error){
        console.log(error)
      })
  },[]);

  return (
    <div className="my-page space-y-5">
      <UserInfo />
      <div className='h-96'>
       <SideBar />
      </div>
    </div>
  );
}
