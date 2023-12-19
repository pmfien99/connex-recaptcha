/**
 * Greets the user by printing a message in the console.
 * @param name The user's name.
 */
export const autofillForm = (cookieData, form) => {
  Object.entries(cookieData).forEach((entry) => {
    const [key, value] = entry;
    formInputs.forEach((input) => {
      if (key === input.getAttribute('cookie-field')) {
        const inputType = input.getAttribute('type');
        if (inputType === 'radio') {
          const savedChoice = value;
          if (input.getAttribute('id') === savedChoice) {
            setTimeout(() => {
              input.click();
            }, 1000);
          }
        } else if (inputType === 'checkbox') {
          if (value === 'on') {
            setTimeout(() => {
              input.click();
            }, 1000);
          }
        } else if (input.tagName === 'SELECT') {
          const savedOption = value;
          const options = input.parentElement.querySelectorAll('a');
          options.forEach((option) => {
            if (option.textContent === savedOption) {
              option.click();
              return;
            }
          });
        }
        input.value = value;
      }
    });
  });
};
