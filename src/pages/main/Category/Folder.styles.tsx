import styled from "styled-components";

export const Container = styled.div`
  width: 200px;
  height: 50px;
  padding: 5px;
  margin-right: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px #888 solid;
  background: #fafafa;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  transition: all .2s;

  //@media (max-width: 1200px) {
  //  width: 23%;
  //  margin-right: 2%;
  //}
  //
  //@media (max-width: 850px) {
  //  margin-right: 3%;
  //  width: 30%;
  //}
  
  &:hover {
    background: #eaeaea;
  }

  &.selected {
    background: #d8d8ff;
    color: #4444ff;
  }
`;

export const Image = styled.img`
  width: 36px;
  height: 36px;
`;

export const Name = styled.p`
  font-size: 16px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  margin-left: 8px;
`;