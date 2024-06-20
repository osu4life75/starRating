// import '@testing-library/jest-dom/extend-expect';
import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StarRating from "./index";

test("renders the correct number of stars", () => {
  const { container } = render(<StarRating noOfStars={5} />);
  const stars = container.querySelectorAll("svg");
  expect(stars.length).toBe(5);
});

test("changes rating on star click", () => {
  const { container } = render(<StarRating noOfStars={5} />);
  const stars = container.querySelectorAll("svg");

  fireEvent.click(stars[2]); // Click the third star
  for (let i = 0; i < 3; i++) {
    expect(stars[i]).toHaveClass("active");
  }
  for (let i = 3; i < 5; i++) {
    expect(stars[i]).toHaveClass("inactive");
  }
});

test("changes star appearance on hover", () => {
  const { container } = render(<StarRating noOfStars={5} />);
  const stars = container.querySelectorAll("svg");

  fireEvent.mouseMove(stars[2]); // Hover over the third star
  for (let i = 0; i < 3; i++) {
    expect(stars[i]).toHaveClass("active");
  }
  for (let i = 3; i < 5; i++) {
    expect(stars[i]).toHaveClass("inactive");
  }

  fireEvent.mouseLeave(stars[2]); // Mouse leaves the third star
  for (let i = 0; i < 5; i++) {
    expect(stars[i]).toHaveClass("inactive");
  }
});

test("resets star appearance to current rating on mouse leave", () => {
  const { container } = render(<StarRating noOfStars={5} />);
  const stars = container.querySelectorAll("svg");

  fireEvent.click(stars[2]); // Click the third star
  fireEvent.mouseMove(stars[4]); // Hover over the fifth star
  fireEvent.mouseLeave(stars[4]); // Mouse leaves the fifth star

  for (let i = 0; i < 3; i++) {
    expect(stars[i]).toHaveClass("active");
  }
  for (let i = 3; i < 5; i++) {
    expect(stars[i]).toHaveClass("inactive");
  }
});
