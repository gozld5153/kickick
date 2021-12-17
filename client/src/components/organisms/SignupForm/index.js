
import React, { useState, useRef } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { SignupInputBox, DatePicker, ConditionChamber } from "../../../components";
import { signUp, tempoSignUp } from "../../../apis/auth";
import { validation } from "../../../commons/utils/validation"

export default function SignupForm() {
  const navigate = useNavigate();
  const params = useParams();
  const isLogin = useSelector((state) => state.login.isLogin);
  const width = 30;
  const height = 3;
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const ArrInfo = [
    {
      title: "닉네임",
      type: "text",
      part: "username",
      placeholder: "username1234",
      inputRef: inputRef1,
      validation: (value) => validation("username", value),
    },
    {
      title: "이메일",
      type: "text",
      part: "email",
      placeholder: "email@gmail.com",
      inputRef: inputRef2,
      validation: (value) => validation("email", value),
    },
    {
      title: "비밀번호",
      type: "password",
      part: "password",
      placeholder: "1q2w3e4r!1",
      inputRef: inputRef3,
      validation: (value) => validation("password", value),
    },
  ];
  const conditionArr = [
    {
      essential: true,
      context: "약관1",
      description: "약관 내용입니다.",
    },
    {
      essential: true,
      context: "약관2",
      description: "약관 내용입니다.",
    },
    {
      essential: false,
      context: "약관3",
      description: "약관 내용입니다.",
    },
  ];


  const [inputValue, setInputValue] = useState({ type: params.type });
  const [isvalid, setIsVaild] = useState([]);
  const [isDuplicate, setIsDuplicate] = useState([false, false]);
  const [conditionCheck,setConditionCheck] = useState({})


  const conditonChecker = (key, value) => {
    let newObj = { ...conditionCheck };
    newObj[key] = value;
    setConditionCheck({ ...newObj });
  }

  const inputHandler = (key, value) => {
    let newObj = { ...inputValue };
    newObj[key] = value;
    setInputValue({ ...newObj });
  };

  const moveNextInput = (idx) => {
    if (idx < ArrInfo.length) ArrInfo[idx].inputRef.current.focus();
  }
  
  const vaildHanlder = (idx,validation) => {
    const newArr = [...isvalid];
    newArr[idx] = validation;
    setIsVaild([...newArr]);
  }

  const duplicateCheckHanlder = (idx, duplicate) => {
    const newArr = [...isDuplicate];
    newArr[idx] = duplicate;
    setIsDuplicate([...newArr]);
  };

  const submitHandler = () => {
    let countIsvalid = 0;
    let countDuplicate = 0;
    let countCondition = 0;

    for (let i = 0; i < isvalid.length; i++) {
      if(isvalid[i] === true) countIsvalid++;
    }
    for (let i = 0; i < isDuplicate.length; i++) {
      if (isDuplicate[i] === true) countDuplicate++;
    }
    for (let k = 0; k < conditionArr.length; k++) {
      if (conditionArr[k].essential) countCondition++;
    }
    for (let l = 0; l < Object.values(conditionCheck).length; l++) {
      if(Object.values(conditionCheck)[l]) countCondition--;
    }

    if (
      isLogin === false &&
      countCondition === 0 &&
      countIsvalid === ArrInfo.length &&
      countDuplicate === 2 &&
      Object.keys(inputValue).join("").includes("birthday")
    ) {
      signUp(inputValue).then(() => navigate("/", { replace: true }));
    }
    if (
      isLogin &&
      isLogin.type === "guest" &&
      countCondition === 0 &&
      countDuplicate === 2 &&
      countIsvalid === ArrInfo.length &&
      Object.keys(inputValue).join("").includes("birthday")
    ) {
      tempoSignUp(inputValue).then(() => navigate("/", { replace: true }));
    }
  }

  return (
    <Container>
      {ArrInfo.map((el, idx) => (
        <SignupInputBox
          title={el.title}
          type={el.type}
          part={el.part}
          width={width}
          height={height}
          placeholder={el.placeholder}
          inputHandler={inputHandler}
          duplicateCheckHanlder={duplicateCheckHanlder}
          moveNextInput={moveNextInput}
          inputRef={el.inputRef}
          validation={el.validation}
          vaildHanlder={vaildHanlder}
          idx={idx}
          key={idx}
        />
      ))}
      <DatePicker width={width} height={height} inputHandler={inputHandler} />
      <ConditionChamber
        conditionArr={conditionArr}
        width={width}
        height={height}
        conditonChecker={conditonChecker}
      />
      <SubmitContainer width={width}>
        <SubmitBtn onClick={submitHandler}>가입하기</SubmitBtn>
      </SubmitContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 79vh;
  align-items: center;
  width: ${({ width }) => `${width}rem`};
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: ${({ width }) => `${width}rem`};
  margin-top: 1.5rem;
`;

const SubmitBtn = styled.button`
  height: 2.4rem;
  padding-top: 0.24rem;
  border-radius: 0.3rem;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-family: ${({ theme }) => theme.fontFamily.blackHanSans};
  color: white;
  background-color: ${({ theme }) => theme.color.navBtn};

  :hover {
    opacity: 0.9;
  }
`;