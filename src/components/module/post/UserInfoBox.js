import React from "react";
import styled from "styled-components";
const LayOut = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 42px;
  height: 42px;
  border: 1px solid #dbdbdb;
  border-radius: 50%;
  margin-right: 12px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.strong`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 2px;
`;
const Id = styled.strong`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #767676;
  &::before {
    content: "@";
    margin-right: 3px;
  }
`;

export default function UserInfoBox({ src, name, id }) {
  return (
    <LayOut>
      <ProfileImg src={src} />
      <Wrapper>
        <Name>{name}</Name>
        <Id>{id}</Id>
      </Wrapper>
    </LayOut>
  );
}