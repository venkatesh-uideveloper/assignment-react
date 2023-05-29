import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home/Home";
import Sessions from "../Sessions/Sessions";
import { BrowserRouter as Router, Route } from "react-router-dom";

jest.mock("../Sessions/Sessions", () => {
  return jest.fn(() => <div>Mocked Sessions Page</div>);
});

test("test", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const linkElement = screen.getByTestId("heading");
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveTextContent("Welcome!");
});
