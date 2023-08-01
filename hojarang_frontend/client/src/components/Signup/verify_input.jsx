import { useState } from "react"
import axios from "axios"

export default function Verify_check({email, ChangeEmailValid}) {
  // 인증번호 변수
  const [VerifyNum, setVerifyNum] = useState('')
  const onChange = (e) => {
    setVerifyNum(e.target.value)
  }

  // 인증번호 확인 절차
  const NumberCheck = () => {
    axios.post('http://honjarang.kro.kr:30000/api/v1/users/verify-code', {
      email: email,
      code: VerifyNum
    })
    .then(function(res) {
      console.log(res)
      ChangeEmailValid()
    })
    .catch(function(err) {
      console.log(err)
      alert('인증번호가 틀렸습니다.')
    })
  }


  return (
    <div>
      <div>
            인증번호 입력
            <br />
            <input type="text" onChange = {onChange}/>
            <button className='border-solid border border-black rounded bg-gray2 ml-2'
            onClick={NumberCheck}>인증번호 확인</button>
          </div>
    </div>
  )
}