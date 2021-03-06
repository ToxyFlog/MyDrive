import styled from "styled-components";

export const Container = styled.div`
  min-width: 175px;
  max-width: 300px;
  flex: 1 0 calc(25% - 15px);
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

  &:hover {
    background: #eaeaea;
  }

  &.selected {
    background: #d8d8ff;
    color: #4444ff;
  }

  @media (min-width: 1600px) {
    max-width: 350px;
    flex: 1 0 calc(20% - 15px);
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

  @media (min-width: 1600px) {
    font-size: 20px;
    margin-left: 10px;
  }
`;