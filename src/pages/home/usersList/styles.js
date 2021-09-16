import styled from "styled-components";

export const Row = styled.div`
  width: 100%;
  height: 90px;
  padding: 15px 0;
  border-bottom: 1px dotted #f2f2f2;
  position: relative;
  &>div{
    display: inline-block;
    color: brown;
    // todo - intentional change introduced
    // color: red;
  }
  button,a{
    position:  absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: pink;
    // todo - intentional change introduced
    // background-color: cyan;
    &.delete{
      right: 0px;
    }
    &.edit{
      right: 70px;
    }
  }
`;
export const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #d4e2b1;
  // todo - intentional change introduced
  // background: #b1d0e2;
  float: left;
  img{
    // todo - intentional change introduced
    width: 65px;
    height: 65px;
    border-radius: 50%;
  }
`;
export const UserInfo = styled.div`
  width:calc(100% - 60px) ;
  height: 60px;
  // todo - intentional change introduced
  // padding: 0 40px;
  float: left;
  &>div{
    margin: 2px 0;
  }
`;
export const Text = styled.div`
  font-size: 1rem;
  color : ${props => props.color === 'firstname' ? '#999' : '#777' };
  font-weight : ${props => props.color === 'firstname' ? '100' : '700' };
`;