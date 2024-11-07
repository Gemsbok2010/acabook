import styled from "styled-components";

export const StyledFormButton = styled.input`
  background-color: #dddddd;
  height: 48px;
  color: #888;
  margin-top: 16px;
  width: 100%;
  border-radius: 4px;
  text-align: center;
  font-weight: 800;
  outline: none;
  font-size: 20px;
  border: none;
  box-sizing: border-box;
  cursor: default;
  &:hover {
    background-color: #ddd;
    color: #888;
    cursor: default;
  }
  &:focus {
    background-color: #ddd;
    color: #888;
    cursor: default;
    outline: none;
  }
  &:active {
    background-color: #ddd;
    color: #888;
    cursor: default;
    outline: none;
  }
`;

export const StyledFormSubmit = styled.input`
  background-color: #a5ce0f;
  color: white;
  margin-top: 16px;
  cursor: pointer;
  height: 48px;
  border-radius: 4px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  font-size: 20px;
  border: none;
  font-weight: 800;
  outline: none;
`;

export const StyledFormSubmitting = styled.button`
  background-color: #a5ce0f;
  color: white;
  align-items: center;
  margin-top: 16px;
  cursor: pointer;
  height: 48px;
  border-radius: 4px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  font-size: 20px;
  border: none;
  font-weight: 800;
  outline: none;
  &:hover {
    background-color: #a5ce0f;
    color: white;
    cursor: default;
  }
  &:focus {
    background-color: #a5ce0f;
    color: white;
    cursor: default;
    outline: none;
  }
  &:active {
    background-color: #a5ce0f;
    color: white;
    cursor: default;
    outline: none;
  }
`;

export const StyledDropdown = styled.div`
animation: mailframe 1000ms ease-in-out 5000ms forwards,
transition: all 5000ms ease-in-out forwards,
background-color: deeppink
`;
