/* eslint-env jest */
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import Favorites from "../pages/Favorites";
import { BrowserRouter } from "react-router-dom";

test("renders loading initially", () => {
  render(
    <BrowserRouter>
      <Favorites />
    </BrowserRouter>
  );
  const loadingText = screen.getByText(/Loading favorites/i);
  expect(loadingText).toBeInTheDocument();
});
