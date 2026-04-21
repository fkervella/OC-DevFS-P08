import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { FavoritesProvider, useFavorites } from "./FavoriteContext";

const mockProperty1 = {
  id: "1",
  slug: "test-property",
  title: "Test Property",
  description: "Description test",
  cover: "/cover.jpg",
  location: "Paris",
  price_per_night: 100,
  rating_avg: 4.5,
  ratings_count: 10,
  pictures: ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"],
  equipments: [],
  tags: [],
  host: { id: 1, name: "Host", picture: "/host.jpg" },
};

function TestComponent() {
  const { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite } =
    useFavorites();

  return (
    <div data-testid="consumer">
      <div data-testid="count">{favorites.length}</div>
      <div data-testid="is-fav-1">{isFavorite("1") ? "yes" : "no"}</div>
      <div data-testid="is-fav-2">{isFavorite("2") ? "yes" : "no"}</div>
      <button onClick={() => addFavorite(mockProperty1)} data-testid="add-btn">
        Add 1
      </button>
      <button
        onClick={() => removeFavorite(mockProperty1)}
        data-testid="remove-btn"
      >
        Remove 1
      </button>
      <button
        onClick={() => toggleFavorite(mockProperty1)}
        data-testid="toggle-btn"
      >
        Toggle 1
      </button>
    </div>
  );
}

describe("FavoriteContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("Etat initial", () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    const localStorageContext = localStorage.getItem("favorites");

    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.getByTestId("is-fav-1")).toHaveTextContent("no");
    expect(screen.getByTestId("is-fav-2")).toHaveTextContent("no");

    expect(localStorageContext).toBeFalsy();
  });

  it("Ajout premier favori", () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    fireEvent.click(screen.getByTestId("add-btn"));
    const localStorageContext = localStorage.getItem("favorites");

    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("is-fav-1")).toHaveTextContent("yes");
    expect(screen.getByTestId("is-fav-2")).toHaveTextContent("no");

    expect(localStorageContext).toBeTruthy();
    const parsed = JSON.parse(localStorageContext!);
    expect(parsed.length).toBe(1);
    expect(parsed[0].id).toBe("1");
  });

  it("Suppression un favori", () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    fireEvent.click(screen.getByTestId("add-btn"));
    fireEvent.click(screen.getByTestId("remove-btn"));
    const localStorageContext = localStorage.getItem("favorites");

    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.getByTestId("is-fav-1")).toHaveTextContent("no");
    expect(screen.getByTestId("is-fav-2")).toHaveTextContent("no");

    expect(localStorageContext).toBeFalsy();
  });

  it("Changement état favori", () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    fireEvent.click(screen.getByTestId("toggle-btn"));
    const localStorageContext1 = localStorage.getItem("favorites");

    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("is-fav-1")).toHaveTextContent("yes");
    expect(screen.getByTestId("is-fav-2")).toHaveTextContent("no");

    expect(localStorageContext1).toBeTruthy();
    const parsed = JSON.parse(localStorageContext1!);
    expect(parsed.length).toBe(1);
    expect(parsed[0].id).toBe("1");

    fireEvent.click(screen.getByTestId("toggle-btn"));
    const localStorageContext2 = localStorage.getItem("favorites");

    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.getByTestId("is-fav-1")).toHaveTextContent("no");
    expect(screen.getByTestId("is-fav-2")).toHaveTextContent("no");

    expect(localStorageContext2).toBeFalsy();
  });
});
