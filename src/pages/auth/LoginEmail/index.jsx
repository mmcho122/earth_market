import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../../../actions/userActions";

// 스타일 컴포넌트

import { MainTitle } from "../../../components/MainTitle";
import { Button } from "../../../components/Button";
import { FormContainer } from "../../../components/Form";
import { MainLayOut } from "./index.style";

const LoginEmail = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const onSubmit = data => {
    const { email, password } = data;

    dispatch(login(email, password));
  };

  return (
    <MainLayOut>
      <MainTitle>로그인</MainTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <div>
            <label>이메일</label>
            <input
              name="email"
              type="email"
              placeholder="이메일"
              {...register("email")}
            />
          </div>
        </FormContainer>
        <FormContainer>
          <div>
            <label>비밀번호</label>
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              {...register("password")}
            />
          </div>
        </FormContainer>

        {/*  <div>
        <input type="submit" />
      </div> */}
        <Button>로그인</Button>
      </form>
    </MainLayOut>
  );
};

export default LoginEmail;
