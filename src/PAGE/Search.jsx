import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getSearchUser } from "../actions/userActions";
//스타일
import { HeaderSearch } from "../components/template/common/Header";
import {
  SearchUserList,
  SearchUserItem,
} from "../components/module/user/SearchUser";
import PrevBtn from "../asset/icon-arrow-left.svg";
import Navigation from "../components/template/common/Navigation";

// icon-arrow-left.svg
const Search = () => {
  //리덕스 스토어에서 어떤 액션이 있는지 확인 후, API성공시 데이터 확인
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  //검색결과 사용자들 스토어에서 가져오기
  const { users } = useSelector(state => state.userSearch);

  //API성공 후 users 확인
  console.log(users && users);

  const onSubmit = data => {
    const { keyword } = data;
    //API함수에 전달전에 매개변수 keyword가 잘 들어가는지 확인
    console.log(keyword, "검색어");
    //유저 검색 API
    dispatch(getSearchUser(keyword));
  };
  return (
    <>
      <HeaderLayOut>
        <HeaderContainer>
          <HeaderLink to={"/home"}>
            <img src={PrevBtn} alt="이전 페이지 버튼" />
          </HeaderLink>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Label>
              <span className="textHidden">계정 검색창입니다.</span>
              <HeaderInput
                name="keyword"
                {...register("keyword")}
                type="text"
                placeholder="계정검색"
                autoComplete="off"
              />
            </Label>
          </Form>
        </HeaderContainer>
      </HeaderLayOut>
      <LayOut>
        <UserListContainer>
          {users &&
            users.map(user => {
              return (
                // 링크 타면 해당 유저 프로필로 이동
                <UserListWrapper key={user._id}>
                  <UserImgLink to={`/profile/you/${user.accountname}`}>
                    <img src={user?.image} alt="프로필 사진" />
                  </UserImgLink>
                  <UserInfoWrapper>
                    <UserName>
                      <strong>{user?.username}</strong>
                    </UserName>
                    <UserId>
                      <strong>{user?.accountname}</strong>
                    </UserId>
                  </UserInfoWrapper>
                </UserListWrapper>
              );
            })}
        </UserListContainer>
      </LayOut>
      <Navigation />
    </>
  );
};

const HeaderLayOut = styled.header`
  position: fixed;
  width: 100%;
  min-width: 390px;
  left: 0;
  top: 0;
  background-color: #fff;
  z-index: 10;
`;

const HeaderContainer = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  height: 48px;
  padding: 0 16px;
  border-bottom: 0.5px solid ${props => props.theme.palette["border"]};
`;

const HeaderLink = styled(Link)`
  width: 22px;
  height: 22px;
  border: none;
  margin-right: 10px;
  cursor: pointer;
`;

const Form = styled.form`
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 1px;
  // color: transparent;
`;

const HeaderInput = styled.input`
  width: 100%;
  height: 32px;
  background-color: ${props => props.theme.palette["bg"]};
  border-style: none;
  border-radius: 32px;
  padding: 0 16px;
  font-size: 14px;
  color: ${props => props.theme.palette["main"]};
  caret-color: ${props => props.theme.palette["main"]};

  &::placeholder {
    color: ${props => props.theme.palette["lightGray"]};
  }
`;
const LayOut = styled.main`
  position: fixed;
  display: flex;
  justify-content: center;
  height: calc(100% - 108px);
  padding: 20px 16px;
  overflow-y: scroll;
  min-width: 100%;
  margin-top: 48px;
`;

const UserListContainer = styled.ul`
  max-width: 390px;
  width: 100%;
  box-sizing: border-box;
`;

const UserListWrapper = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

// 프로필 사진 크기 수정 필요
const UserImgLink = styled(Link)`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 0.5px solid ${props => props.theme.palette["border"]};
    font-size: 10px;
    overflow: hidden;
  }
`;

const UserInfoWrapper = styled.div`
  margin-left: 12px;
  width: calc(100% - 118px);
  height: 100%;
  align-self: flex-start;
`;

const UserName = styled.strong`
  display: block;
  margin: 5px 0 6px;
  line-height: 18px;
  font-size: 14px;
  font-weight: 500;
`;

const UserId = styled.strong`
  color: ${props => props.theme.palette["subText"]};
  font-size: 12px;
  line-height: 15px;
  &::before {
    content: "@";
    margin-right: 3px;
  }
`;

export default Search;
