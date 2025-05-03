console.log('✅ File is loading');

describe('Sanity Test', () => {
  it('should work', () => {
    cy.visit('https://naveenautomationlabs.com/opencart/index.php?route=account/login')
    expect(true).to.equal(true);
  });
});