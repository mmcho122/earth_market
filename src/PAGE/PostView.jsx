import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { getUserMyProfile } from "../actions/userActions";
import { getPost } from "../actions/postActions";
import {
  getCommentList,
  deleteComment,
  commentCreateAction,
} from "../actions/commentAction";

// 스타일로직
import { UserInfoBox } from "../components/module/post/UserInfoBox";
import { Button } from "../components/module/button/button";
import { Modal, AlertBtn, ListBtn } from "../components/module/modal/Modal";
import { Alert, AlertBox } from "../components/module/alert/Alert";
import { HeaderHome } from "../components/template/common/Header";
import IconBox from "../components/module/post/IconBox";
import Date from "../components/module/post/Date";
import styled, { css } from "styled-components";
import dayjs from "dayjs";
import { ReplyBox, CommentList } from "../components/module/post/ReplyBox";
import ProfileIcon from "../asset/icon/basic-profile.svg";
import prev from "../asset/icon-arrow-left.svg";
import more from "../asset/icon-more-vertical.svg";

const PostView = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();
  // getPost API에 사용될 데이터
  const { postId } = useParams();
  // 댓글 생성시 useEffect에 적용하여, 재 렌더링 하기 위함
  const { craeteCommentId } = useSelector(state => state.commentCreate);

  // 댓글 삭제시 useEffect에 적용하여, 재 렌더링 하기 위함
  const { deleteCommentId } = useSelector(state => state.commentDelete);

  // 사용자 프로필을 리덕스 스토어에서 가져오기
  const { image, username, accountname } = useSelector(
    state => state.userReadProfile,
  );

  // 상세 게시글 스토어에서 가져오기
  const { content, updatedAt, heartCount, commentCount, postImages } =
    useSelector(state => state.postRead);

  // 댓글 리스트 배열을 스토어에서 가져오기
  const commentListArr = useSelector(state => state.commentList.comments);

  // 댓글 생성
  const onSubmit = data => {
    const { comment } = data;
    dispatch(commentCreateAction(comment, postId));
    reset();
  };

  const onClickDeleteComment = commentId => {
    //댓글 삭제 API
    dispatch(deleteComment(postId, commentId));
  };

  useEffect(() => {
    //프로필 정보 얻어오기 API
    dispatch(getUserMyProfile());
  }, [dispatch]);

  useEffect(() => {
    //상세 게시글 불러오기 API
    dispatch(getPost(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    //댓글 리스트 가져오기 API
    dispatch(getCommentList(postId));
  }, [dispatch, postId, craeteCommentId, deleteCommentId]);

  // 🕹 네비게이션 Modal & Alert
  const [navDialog, setNavDialog] = useState(false);
  const [navAlert, setNavAlert] = useState(false);
  const isNavDialog = () => setNavDialog(!navDialog);
  const isNavAlert = () => setNavAlert(!navAlert);
  // 🏞 게시글 모달 Modal & Alert
  const [postDialog, setPostDialog] = useState(false);
  const [postAlert, setPostAlert] = useState(false);
  const isPostDialog = () => setPostDialog(!postDialog);
  const isPostAlert = () => setPostAlert(!postAlert);
  // 🏞 댓글 모달 Modal & Alert
  const [chatDialog, setChatDialog] = useState(false);
  const [chatAlert, setChatAlert] = useState(false);
  const isChatDialog = () => setChatDialog(!chatDialog);
  const isChatAlert = () => setChatAlert(!chatAlert);

  return (
    <>
      {/* 헤더 */}
      <HeaderLayOut>
        <HeaderContainer>
          <HeaderLink>
            <img
              src={prev}
              onClick={() => history.goBack()}
              alt="이전 페이지 버튼"
            />
          </HeaderLink>
          <HeaderLink>
            <img src={more} alt="더보기 버튼" onClick={isNavDialog} />
          </HeaderLink>
        </HeaderContainer>
      </HeaderLayOut>
      {/* <HeaderHome /> */}
      <LayOut>
        <Container>
          {/* 유저 인포 */}
          <UserInfoBox profileImage={image} name={username} id={accountname} />
          {/* 게시글 영역 */}
          <ContentBox>
            <ContentText>{content}</ContentText>
            <ImageContainer>
              <ImageList>
                {postImages &&
                  postImages.map(postImage => {
                    return (
                      <ItemWrapper key={postImage}>
                        <img src={postImage} alt="게시글 이미지" />
                      </ItemWrapper>
                    );
                  })}
              </ImageList>
              <BtnList>
                {postImages &&
                  postImages.map(item => {
                    return <button key={item} />;
                  })}
              </BtnList>
            </ImageContainer>
            <IconBox like={heartCount} comment={commentCount} />
            <Date>{dayjs(updatedAt).format("YY년 MM월 DD일")}</Date>
          </ContentBox>
          <MoreBtn onClick={isPostDialog} />
        </Container>
        {/* 댓글 리스트*/}
        <CommentList>
          {commentListArr &&
            commentListArr.map(user => {
              console.log(user?.createdAt);
              return (
                <ReplyBox
                  img={user?.author?.image}
                  username={user?.author?.username}
                  time={user?.createdAt}
                  comment={user?.content}
                  key={user?.id}
                  isDialog={isChatDialog}
                />
              );
            })}
        </CommentList>
        {/* 댓글 생성 */}
        <SubmitChatLayOut>
          <SubmitChatContainer
            onSubmit={handleSubmit(onSubmit)}
            autocomplete="new-password"
          >
            <ProfileLinkImg src={ProfileIcon} alt="프로필" />
            <SubmitChatLabel>
              댓글 입력하기
              <SubmitChatInput
                name="comment"
                type="text"
                placeholder="댓글 입력하기"
                autoComplete="off"
                {...register("comment")}
              />
            </SubmitChatLabel>
            <SubmitChatButton>게시</SubmitChatButton>
          </SubmitChatContainer>
        </SubmitChatLayOut>
      </LayOut>

      <Modal visible={navDialog}>
        <ListBtn isDialog={isNavDialog}>설정 및 개인정보</ListBtn>
        <AlertBtn isAlert={isNavAlert}>로그아웃</AlertBtn>
        <ListBtn isDialog={isNavDialog}>모달창 닫기</ListBtn>
      </Modal>
      {/* Nav Alert */}
      <Alert visible={navAlert} messageText="로그아웃 하시겠어요?">
        <AlertBox isAlert={isNavAlert}>예</AlertBox>
        <AlertBox isAlert={isNavAlert}>아니요</AlertBox>
      </Alert>

      {/* 게시글 Modal */}
      <Modal visible={postDialog}>
        <AlertBtn isAlert={isPostAlert}>신고하기</AlertBtn>
        <ListBtn isDialog={isPostDialog}>모달창 닫기</ListBtn>
      </Modal>
      {/* 게시글 Alert */}
      <Alert visible={postAlert} messageText="게시글을 신고하시겠어요?">
        <AlertBox isAlert={isPostAlert}>예</AlertBox>
        <AlertBox isAlert={isPostAlert}>아니요</AlertBox>
      </Alert>

      {/* chat Modal */}
      <Modal visible={chatDialog}>
        <AlertBtn isAlert={isChatAlert}>신고하기</AlertBtn>
        <ListBtn isDialog={isChatDialog}>모달창 닫기</ListBtn>
      </Modal>

      {/* chat Alert */}
      <Alert visible={chatAlert} messageText="신고하시겠어요?">
        <AlertBox isAlert={isChatAlert}>예</AlertBox>
        <AlertBox isAlert={isChatAlert}>아니요</AlertBox>
      </Alert>
    </>
  );
};

const HeaderLayOut = styled.header`
  position: sticky;
  width: 100%;
  height: 47.5px;
  min-width: 390px;
  top: 0;
  background-color: #fff;
  z-index: 10;
`;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  height: 48px;
  padding: 0 16px;
  border-bottom: 0.5px solid ${props => props.theme.palette["border"]};
`;

const HeaderLink = styled.div`
  width: 22px;
  height: 22px;
  border: none;
  /* margin-right: 10px; */
  cursor: pointer;
`;

const LayOut = styled.main`
  ${props => props.theme.common.flexCenterColumn}
  ${props =>
    props.center &&
    css`
      justify-content: center;
    `}
  position: fixed;
  height: calc(100% - 108px);
  overflow-y: scroll;
  width: 100%;
  min-width: 100%;
`;

const Container = styled.article`
  position: relative;
  max-width: 358px;
  width: 100%;
  padding: 20px 0 24px;
`;
const ContentBox = styled.section`
  padding-left: 54px;
`;
const ContentText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 16px;
`;

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
  max-height: 228px;
  border-radius: 10px;
  overflow: hidden;
`;

const ImageList = styled.ul`
  display: flex;
  transition: all 0.4s;
`;

const ItemWrapper = styled.li`
  min-width: 304px;
  width: 100%;
  max-height: 228px;
  min-height: 228px;
  border: 0.5px solid var(--border-color);
  border-radius: 10px;
  overflow: hidden;

  img {
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 16px;
  }
`;
const BtnList = styled.div`
  position: absolute;
  display: flex;
  gap: 6px;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);

  button {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fff;
  }
`;

const MoreBtn = styled.button`
  position: absolute;
  top: 24px;
  right: 0;
  width: 18px;
  height: 18px;
  background: url(${more}) no-repeat center / 18px 18px;
  background-color: inherit;
`;

const ProfileLinkImg = styled.img`
  width: 36px;
`;

const SubmitChatLayOut = styled.section`
  position: fixed;
  left: 0;
  bottom: 0;
  min-width: 390px;
  width: 100%;
  border-style: none;
  border-top: 0.5px solid ${props => props.theme.palette["border"]};
  background-color: #fff;
`;

const SubmitChatContainer = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 100%;
  height: 60px;
  padding: 0 16px;
`;

// 웹 접근성을 높이는 방법입니다.
const SubmitChatLabel = styled.label`
  display: block;
  width: 100%;
  font-size: 3px;
  color: transparent;
  margin: 0 16px;
`;

const SubmitChatInput = styled.input`
  display: block;
  width: 100%;
  border-style: none;

  &::placeholder {
    color: ${props => props.theme.palette["border"]};
  }
`;

const SubmitChatButton = styled.button`
  display: block;
  width: 30px;
  border-style: none;
  cursor: pointer;
  color: ${props => props.theme.palette["lightGray"]};
  &:focus {
    color: ${props => props.theme.palette["main"]};
  }
`;

export default PostView;
