const htmlForm = `
  <div class="funnel-step__form payment-form">
    <div class="funnel-step__form--row">
      <div class="input-container full-size">
        <input name="cc-number" type="tel" autocomplete="cc-number" maxlength="19" placeholder="N° de carte" class="" value="">
      </div>
    </div>
    <div class="funnel-step__form--row">
      <input name="cc-exp" type="tel" placeholder="MM / AA" class="" maxlength="7" value="">
      <div class="input-container">
        <input name="cc-csc" type="tel" placeholder="Cryptogramme" class="" maxlength="3" minlength="3" value="">
      </div>
    </div>
  </div>
`;

const systemPaySDK = {
  setFormConfig: () => Promise.resolve(),
  setFormToken: () => {},
  removeForms: () => {},
  onError: () => {},
  onFocus: () => {},
  validateForm: () => Promise.resolve(),
  submit: () => Promise.resolve(),
  submitCallback: () => {},
};
systemPaySDK.onSubmit = (callback) => { systemPaySDK.submitCallback = callback; };
export const KR = systemPaySDK;

export function setPaymentForm() {
  Cypress.Commands.add('setPaymentForm', () => cy.get('.kr-embedded').then(($node) => {
    Cypress.$($node).replaceWith(htmlForm);
  }));
}
