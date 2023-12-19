/**
 * Greets the user by printing a message in the console.
 * @param name The user's name.
 */
export const makeWebflowFormAjax = (form: HTMLElement, name: string) => {
  // Set Up Form Variables

  const formAction: string | null = form.getAttribute('action');
  const formMethod: string | null = form.getAttribute('method');
  const successElement: HTMLElement | null = form.querySelector('.w-form-done');
  const failElement: HTMLElement | null = form.querySelector('.w-form-fail');
  const honey: HTMLInputElement | null = form.querySelector('.w-form-ohnohoney');
  console.log(formAction);
  console.log(formMethod);
  console.log(successElement);
  console.log(failElement);
  console.log(honey);

  const actionURL: string | null = formAction + '?';
  console.log(actionURL);

  // Create Submit Event For Form

  form.addEventListener('submit', () => {
    event?.preventDefault;
    console.log('Submitting form');

    makeAjaxRequest(actionURL);
  });

  const submitButton = $('#accept');

  const data = form.serialize();
  let dataURI = {};

  // Function to perform the AJAX request
  // const performAjaxRequest = function () {
  //   $.ajax({
  //     type: 'GET',
  //     url: action + '?' + dataURI,
  //     dataType: 'jsonp',
  //     jsonpCallback: 'logResult',
  //   });
  // };

  const makeAjaxRequest = (url: string) => {
    console.log('Request string is ' + url);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Request was successful
        // Handle Success
        console.log('Response:', xhr.responseText);
      } else {
        // Handle errors
        console.error(
          'Request failed with status:',
          xhr.status,
          'and status text:',
          xhr.statusText
        );
      }
    };

    xhr.onerror = function () {
      // Handle network errors
      console.error('Network error');
    };

    xhr.send();
  };

  form.find('input, textarea, select').each(function () {
    if (!this.hasAttribute('cookie-ignore')) {
      dataURI[this.name] = $(this).val();
    }
  });
  //
  const filesInput = document.querySelector('[data-type]');
  if (filesInput != null) {
    dataURI[filesInput.getAttribute('name')] = fileNames;
    dataURI = $.param(dataURI);
  }

//   formSuccess = function () {
//     // console.log("FORM SUCCESS");
//     form.hide();
//     doneBlock.fadeIn();
//     failBlock.hide();
//     submitButton.hide();
//     if (!Cookies.get('formFiles')) {
//       const formValues = getFormData();
//       Cookies.set('formFiles', formValues, { expires: 30 });
//     } else {
//       cookieData.itemsId.push(currentForm);
//       Cookies.set('formFiles', cookieData, { expires: 30 });
//     }
//   };
//   formError = function () {
//     // console.log("FORM ERROR");
//     form.show();
//     doneBlock.hide();
//     failBlock.fadeIn();
//     submitButton.val('Submit');
//   };
//   return false;
// };

// // Front End Spam Check - If Honey Exists
// if (honey !== undefined) {
//   if (!honey.length || honey.val() === '') {
//     performAjaxRequest();
//   } else {
//     event.preventDefault();
//     console.error('Spam Detected');
//     formError();
//     return false;
//   }
// } else {
//   // No honey element, proceed with AJAX request
//   performAjaxRequest();
// }
// // Front End Spam Check - If Honey Exists
