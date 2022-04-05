import styled from "styled-components";

export const Container = styled.div`
  width: 120px;
  height: 120px;
  padding: 6px;
  margin-right: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px #888 solid;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all .2s;

  &:hover{
    background: #eaeaea;
  }
  
  &.selected {
    background: #d8d8ff;
	color: #4444ff;
  }
`;

export const FileImage = styled.img`
  width: 80px;
  height: 80px;
`;

export const Filename = styled.p`
  font-size: 13px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
`;