import * as Cookies from 'js-cookie';

window.Webflow ||= [];
window.Webflow.push(() => {
  // When Page Loads Check if "AJAX Form"s Exist
  console.log('CAST FORMS: Running Custom Form Handler');
  const forms: NodeListOf<HTMLElement> = document.querySelectorAll("[data-wup='form']");
  // For Each Form
  if (forms.length > 0) {
    forms.forEach((form) => {
      console.log('CAST FORMS: Loading Form ||||||');
      console.log(form);
      // Submit Action Handler
      form.addEventListener('submit', () => {
        console.log('CAST FORMS: Adding AJAX Submit Event to ' + form);

        const formInputs = form.querySelectorAll('input, select, radio, checkbox');
        console.log(formInputs);
      });

      // const successElement = document.querySelector("[data-wup='successElement']");
      // const currentForm = form.querySelector("[name='itemId']").value;
    });
  }
});
// Auto fill form fields

// For each "AJAX Form" that exists - apply event listener

// // get file names
// const files = document.querySelectorAll('[file-name]');
//   // const filesNamesArr = [];
//   // files.forEach((file) => {
//   //   filesNamesArr.push(file.textContent);
//   // });
//   // const fileNames = filesNamesArr.join(', ');

//   function getFormData() {
//     const formValues = {
//       itemsId: [],
//     };
//     formInputs.forEach((input) => {
//       if (input.getAttribute('name') === 'itemId') {
//         formValues.itemsId.push(input.value);
//         return;
//       }
//       if (input.hasAttribute('cookie-ignore')) return;
//       formValues[input.getAttribute('cookie-field')] = input.value;
//     });
//     return formValues;
//   }

//   window.logResult = function (json) {
//     if (json.result === 'success') {
//       formSuccess();
//     } else if (json.result === 'error') {
//       console.log(json);
//       formError();
//     }
//   };

//   makeWebflowFormAjax($("[data-wup='form']"));
// });

// //// COOKIE CODE
// const cookieData = Cookies.get();
// console.log(cookieData);
// // Cookie Handler
// if (cookieData) {
//   const formsFilled = cookieData.itemsId;
//   formsFilled.forEach((item) => {
//     if (item === currentForm) {
//       form.style.display = 'none';
//       successElement.style.display = 'block';
//     }
//   });
