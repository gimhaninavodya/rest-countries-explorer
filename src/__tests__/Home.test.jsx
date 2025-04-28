/* eslint-env jest */
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";

test("renders region filter select", () => {
  render(
    <Home countries={[]} loading={false} searchTerm="" selectedRegion="" onRegionChange={() => {}} />
  );
  const selectElement = screen.getByLabelText(/Filter by Region/i);
  expect(selectElement).toBeInTheDocument();
});
