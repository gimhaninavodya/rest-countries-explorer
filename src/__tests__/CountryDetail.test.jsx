/* eslint-env jest */
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CountryDetail from "../pages/CountryDetail";

test("renders loading initially when country is being fetched", () => {
  render(
    <MemoryRouter initialEntries={['/country/USA']}>
      <Routes>
        <Route path="/country/:code" element={<CountryDetail />} />
      </Routes>
    </MemoryRouter>
  );

  const loadingText = screen.getByText(/Loading country details/i);
  expect(loadingText).toBeInTheDocument();
});
