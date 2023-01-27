describe("Constructor e2e test", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.intercept("GET", "ingredients", { fixture: "ingredients-data.json" });
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

    cy.visit("http://localhost:3000");

    window.localStorage.setItem('refreshToken', 'c7ad559c1a4b9eba2684313be8880d48a70150babaceec5f764e0f017327467ae7a5233f379e0d9f');
    cy.setCookie('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODYzNGM2OWI1MThhMDAxYmI4OTQ2MyIsImlhdCI6MTY3NDY2MDczNCwiZXhwIjoxNjc0NjYxOTM0fQ.QatxxStkhKp_g45c_rNFCYNHRu-nelMtNT7N5fRilNM')
  });

  it("should open and close modal of an ingredient", () => {
    cy.get("[data-testid=Bun1]").click();
    cy.url().should('eq', 'http://localhost:3000/ingredients/60d3b41abdacab0026a733c6');
    cy.get("[id=modalRoot]").contains("Bun1").should("exist");
    cy.get("[data-testid=close-icon]").should("exist").click();
    cy.get("[id=modalRoot]").contains("Bun1").should("not.exist");
  });

  it("should add ingredients into constructor, make an order and check modal", () => {
    cy.get("[data-testid=Bun1]").trigger('dragstart');
    cy.get("[data-testid=top-bun-place]").trigger('drop');
    cy.get("[data-testid=Main1]").trigger('dragstart');
    cy.get("[data-testid=ingredients-place]").trigger('drop');
    cy.get("[data-testid=Sauce1]").trigger('dragstart');
    cy.get("[data-testid=ingredients-place]").trigger('drop');

    cy.get("[data-testid=ingredients-place]").contains("Main1").should("exist");
    cy.get("[data-testid=ingredients-place]").contains("Sauce1").should("exist");
    cy.get("[data-testid=ingredients-container]").contains("Bun1 (верх)").should("exist");
    cy.get("[data-testid=ingredients-container]").contains("Bun1 (низ)").should("exist");

    cy.get("button").contains("Оформить заказ").click();
    cy.get("[id=modalRoot]").contains("777").should("exist");
    cy.get("[data-testid=close-icon]").should("exist").click();
    cy.get("[id=modalRoot]").contains("777").should("not.exist");
  });
});
