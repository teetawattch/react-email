import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./pages/Login";

test("open login page", () => {
  render(<Login />);
  const title = screen.findAllByText("Login");
  expect(title).toBe(title);
});

test("type username to login", () => {
  render(<Login />);
  const input = screen.getByTestId("email-input");
  fireEvent.change(input, { target: { value: "teetawat.tch@gmail.com" } });
  expect(input.value).toEqual("teetawat.tch@gmail.com");
});

test("type password to login", () => {
  render(<Login />);
  const input = screen.getByTestId("password-input");
  fireEvent.change(input, { target: { value: "123456" } });
  expect(input.value).toEqual("123456");
});

test("check button login is enable", () => {
  render(<Login />);
  const btn = screen.getByTestId("login-btn");
  expect(btn).toBeEnabled();
});
