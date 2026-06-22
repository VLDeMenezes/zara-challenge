import { test, expect } from "@playwright/test";

test("HAPPY PATH - User should search a product, go to specific product page, select color and storage option, add to cart and then pay", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");

  // check cart to be equal to 0
  await expect(page.getByTestId("cart-counter")).toContainText("0");

  // search galaxy
  const searchInput = page.getByTestId("search-bar");
  await searchInput.click();
  await searchInput.fill("galaxy");

  // find the first galaxy article
  const productCard = page
    .locator("article")
    .filter({ hasText: "Galaxy" })
    .first();
  await expect(productCard).toBeVisible();
  await productCard.click();

  // wait to redirect
  await page.waitForURL("**/product/**");
  // expect to be on de product with galaxy h2
  await expect(page.getByRole("heading", { level: 2 })).toContainText("Galaxy");

  // select storage and color
  await page.getByTestId("storage-selector").first().click();
  await page.getByTestId("color-selector").first().click();

  // add to cart
  const addToCartButton = page.getByTestId("add-to-cart");
  await addToCartButton.click();
  await page.waitForURL("**/cart");

  // check be on cart page with only one item
  await expect(page.getByRole("heading", { level: 2 })).toContainText(
    "Cart (1)",
  );

  // proceed to checkout
  const payButton = page.getByTestId("pay-button");
  await payButton.click();

  // check to be in home page with the searchBar and no items on cart
  await page.waitForURL(/\/$/);
  await expect(page.getByTestId("search-bar")).toBeVisible();
  await expect(page.getByTestId("cart-counter")).toContainText("0");
});
