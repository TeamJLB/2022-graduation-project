import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Meetings from '../../components/MeetingListBlock/Meetings';
import NewMeeingModal from '../../components/MeetingListBlock/NewMeetingModal';
import style from './MeetingListPage.module.css';
import {useLocation} from 'react-router-dom';
import Sidebar from "./Sidebar";

const MeetingListPage = () => {
    const location = useLocation();
    const USER_TOKEN = location.state.userToken;
    const navigate = useNavigate();
    const [info, setInfo] = useState([]);
    const [enterID, setEnterID] = useState('');
    const [searchID, setSearchID] = useState('');
    const [modalOn, setModalOn] = useState(false);
    const config = {
        headers :{
            'x-access-token' : USER_TOKEN
        }
    }
    useEffect(()=>{
        loadList();
        console.log(config);
    }, []);

    const loadList = () =>{
        axios.get('http://3.39.169.146/meetings/allList',config)
            .then(res => {
                if(res.data.isSuccess){
                    setInfo(res.data.result);
                }
                else{
                    alert(res.data.message);
                }
            })
            .catch(err => alert(err));
    }

    const handleEnterHistory = (meetingid) =>{
        navigate('/history',{state : {config : config, meeting_id: meetingid}});
    }
    const handleEnterMeeting = (meetingID) => {
        navigate('/meetingRoom', {state: {config : config, meeting_id: meetingID}});
    }
    const handleRemove = (id) =>{
        axios.delete(`http://3.39.169.146/meetings/myMeeting/${id}`,config)
            .then((res)=>{
                console.log(res);
                if (res.data.isSuccess){
                    loadList();
                }
                else{
                    alert(res.data.message);
                }
            })
            .catch(err => alert(err));

    }
    const handleAddMeeting = () =>{
        console.log("click")
        setModalOn(true);
    }
    const handleAddCancel = () =>{
        setModalOn(false);
    }
    const handleAddSubmit = (meetingName, topic) =>{
        setModalOn(false);
        console.log("회의 명 : ",meetingName);
        console.log("주제: ",topic)
        axios.post("http://3.39.169.146/meetings/newMeeting",{
             meeting_name: meetingName,
             topic: topic
         },config)
             .then((res)=>{
                if (res.data.isSuccess){
                    loadList();
                }
                else{
                    alert(res.data.message);
                }
             })
             
    }

    const enterMeeting = () =>{
        axios.post(`http://3.39.169.146/meetings/newMeeting/${enterID}`,'',config)
            .then((res)=>{
                if (res.data.isSuccess){
                    handleEnterMeeting(enterID);
                }
                else{
                    alert(res.data.message);
                }
            })
    }

    const searchMeeting = () => {
        if (searchID === ''){
            loadList();
        }
        else{
            axios.get('http://3.39.169.146/meetings/myMeeting', {
                params: { meetingId: searchID },
                headers :{
                    'x-access-token' : USER_TOKEN
                    }
                } )
                .then((res)=>{
                    if (res.data.isSuccess){
                        setInfo(res.data.result);
                    }
                    else{
                        alert(res.data.message);
                    }
                    setSearchID('');
                })

        }
        

    }

  return (
    <div className="body">
        <div className="sidebar">
            side
        </div>
        <div className="content">
            <div>
            <h1>전체 회의 리스트</h1>
            </div>
            <div>
                내 회의 검색  
                <input type="text" value={searchID} onChange={e=>setSearchID(e.target.value)}/>
                <button onClick={searchMeeting}>검색</button>
            </div>
            <div>
                ID로 회의 입장하기   
                <input id="inputMeetingID" type='text' onChange={e=>setEnterID(e.target.value)}/>
                <button onClick={enterMeeting}>입장</button>
            </div>
            <div className={style.gridscroll}>
                <div className={style.grid}>
                    <Meetings info={info} handleEnterHistory={handleEnterHistory} handleEnterMeeting={handleEnterMeeting} handleRemove={handleRemove}/>
                    <p className={style.makeNewMeetingBtn} onClick={handleAddMeeting}>➕ 회의 만들기</p>
                </div>
                {modalOn && <NewMeeingModal handleAddCancel={handleAddCancel} handleAddSubmit={handleAddSubmit}/>}
            </div>
        </div>
    </div>
  );
};

export default MeetingListPage;
