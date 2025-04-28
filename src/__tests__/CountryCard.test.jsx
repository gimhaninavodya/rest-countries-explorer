/* eslint-env jest */
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import CountryCard from "../components/CountryCard";
import { BrowserRouter } from "react-router-dom";

const mockCountry = {
  cca3: "USA",
  name: { common: "United States" },
  region: "Americas",
  population: 331000000,
  capital: ["Washington, D.C."],
  languages: { eng: "English" },
  flags: { svg: "https://flagcdn.com/us.svg" }
};

test("renders country name", () => {
  render(
    <BrowserRouter>
      <CountryCard country={mockCountry} />
    </BrowserRouter>
  );
  const nameElement = screen.getByRole('heading', { name: /United States/i });
  expect(nameElement).toBeInTheDocument();
});

test("favorites button toggles", () => {
  render(
    <BrowserRouter>
      <CountryCard country={mockCountry} />
    </BrowserRouter>
  );
  
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(button.title).toBe('Remove from Favorites');

  fireEvent.click(button);
  expect(button.title).toBe('Add to Favorites');
});
