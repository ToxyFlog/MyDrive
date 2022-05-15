import styled from "styled-components";

export const Container = styled.div`
  width: 400px;
  min-height: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Header = styled.p`
  font-size: 24px;
  font-weight: 200;
  width: 100%;
  margin-bottom: 8px;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  align-items: center;
  justify-content: flex-end;
  margin-top: 8px;
`;

export const Button = styled.button`
  background: #e8e8e8;
  font-size: 18px;
  font-weight: 300;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 3px 5px;
  cursor: pointer;
  transition: all .2s;

  &:hover {
    background: #ddd;
  }
`;

export const PrimaryButton = styled.button`
  background: #4444fe;
  color: #fff;
  font-size: 18px;
  font-weight: 300;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 3px 5px;
  margin: 0 10px;
  cursor: pointer;
  transition: all .2s;

  &:hover {
    background: #3333ff;
  }
`;

export const DisabledButton = styled.button`
  background: #d8d8d8;
  font-size: 18px;
  font-weight: 300;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 3px 5px;
  margin: 0 10px;
  cursor: not-allowed;
`;