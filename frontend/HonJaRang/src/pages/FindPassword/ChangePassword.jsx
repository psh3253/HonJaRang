import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '@/apis/config';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/2.png';

export default function ChangePassword() {
  // 비밀번호, 비밀번호 확인, 오류메시지
  const navigate = useNavigate();
  const [ordinary, setOrdinary] = useState('');
  const [password, setPassword] = useState('');
  const [password_cfm, setPassword_cfm] = useState('');
  const [pwdMsg, setpwdMsg] = useState('');
  const [pwdcfmMsg, setpwdcfmMsg] = useState('');
  const [Valid, setValid] = useState(true);

  // 비밀번호 유효성 검사(8~15자, 한글/영어/숫자 포함 가능)
  let pwdCheck = /^[A-Za-z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{8,15}$/;
  const pwd_check = (pwd) => {
    if (pwdCheck.test(pwd)) {
      setpwdMsg('');
    } else {
      setpwdMsg('사용할 수 없는 비밀번호입니다.');
    }
  };

  const pwd_cfm_check = (pwd_cfm) => {
    if (pwd_cfm === '') {
      setpwdcfmMsg('');
      setValid(true);
    } else if (pwd_cfm !== password) {
      setpwdcfmMsg('비밀번호가 일치하지 않습니다.');
      setValid(true);
    } else if (pwd_cfm.length >= 8 && pwd_cfm === password) {
      setValid(false);
      setpwdcfmMsg('');
    }
  };

  useEffect(() => {
    pwd_cfm_check(password_cfm);
  });

  const onChange_ordinaryPassword = (event) => {
    setOrdinary(event.currentTarget.value);
  };

  const onChange_password = (event) => {
    setPassword(event.currentTarget.value);
    pwd_check(event.currentTarget.value);
  };

  const onChange_password_cfm = (event) => {
    setPassword_cfm(event.currentTarget.value);
    pwd_cfm_check(event.currentTarget.value);
  };

  const Password_Change = () => {
    axios
      .put(
        `${API.USER}/change-password`,
        {
          password: ordinary,
          new_password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <img src={Logo} className="w-2/12 mb-8" />
      <div>
        <label className="text-main2 text-lg font-semibold">비밀번호</label>
        <br />
        <input
          type="password"
          className="border-gray2 rounded-lg block w-72 h-10 text-base p-2 focus:outline-main2"
          onChange={onChange_ordinaryPassword}
          maxLength="15"
        />
      </div>
      <div>
        <label className="text-main2 text-lg font-semibold">
          새로운 비밀번호
        </label>
        <br />
        <input
          type="password"
          className="border-gray2 rounded-lg block w-72 h-10 text-base p-2 focus:outline-main2"
          onChange={onChange_password}
          maxLength="15"
        />
        <span className="text-xs text-main5 font-semibold">{pwdMsg}</span>
      </div>
      <div>
        <label className="text-main2 text-lg font-semibold">
          새로운 비밀번호 확인
        </label>
        <input
          type="password"
          className="border-gray2 rounded-lg block w-72 h-10 text-base p-2 focus:outline-main2"
          onChange={onChange_password_cfm}
          maxLength="15"
        />
        <span className="text-xs text-main5 font-semibold">{pwdcfmMsg}</span>
      </div>
      <button
        disabled={Valid}
        onClick={Password_Change}
        className="main1-full-button w-72 h-10 text-base"
      >
        비밀번호 변경
      </button>
    </div>
  );
}
