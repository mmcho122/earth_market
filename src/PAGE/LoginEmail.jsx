import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../actions/userActions";
import styled from "styled-components";
import { Button } from "../components/module/button/button";
import LoginTitle from "../components/module/title/LoginTitle";

const LoginEmail = () => {
  const [isButtonStatus, setIsButtonStatus] = useState(false);
  const { register, handleSubmit, watch } = useForm();

  useEffect(() => {
    const subscription = watch(({ email, password }) => {
      if (email && password) {
        setIsButtonStatus(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const dispatch = useDispatch();

  const onSubmit = data => {
    const { email, password } = data;

    dispatch(login(email, password));
  };

  return (
    <>
      <LayOut>
        <LoginTitle>로그인</LoginTitle>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <EmailWrapper>
            <label>이메일</label>
            <input name="email" type="email" {...register("email")} />
          </EmailWrapper>
          <PwWrapper>
            <label>비밀번호</label>
            <input name="password" type="password" {...register("password")} />
          </PwWrapper>
          <Button width="322px" size="lg" isButtonStatus={isButtonStatus}>
            로그인
          </Button>
        </FormContainer>
        {/* <EmailText></EmailText> */}
      </LayOut>
    </>
  );
};

export function Wrapper({ children }) {
  return <EmailWrapper>{children}</EmailWrapper>;
}

const LayOut = styled.main`
  ${props => props.theme.common.flexCenterColumn}
`;

// 공통요소
const FormContainer = styled.form`
  box-sizing: border-box;
`;

const EmailWrapper = styled.div`
  width: 322px;
  height: 48px;
  margin-bottom: 16px;

  label {
    display: block;
    color: #767676;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    margin-bottom: 10px;
  }
  input {
    width: 100%;
    font-size: 14px;
    font-color: #dbdbdb;
    line-height: 14px;
    padding-bottom: 8px;
    border: none;
    border-bottom: 1px solid #dbdbdb;
  }
`;

const PwWrapper = styled.div`
  margin-bottom: 30px;

  label {
    display: block;
    color: #767676;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    margin-bottom: 10px;
  }
  input {
    width: 100%;
    font-size: 14px;
    font-color: #dbdbdb;
    line-height: 14px;
    padding-bottom: 8px;
    border: none;
    border-bottom: 1px solid #dbdbdb;
  }
`;

export default LoginEmail;