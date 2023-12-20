/* eslint-disable no-console */
import fetchJsonp from 'fetch-jsonp';
// import * as Cookies from 'js-cookie';

/**
 * Setup Proper Ajax Handling for Form
 * Creates the "Submit" event for given form to pass data to pardot
 * @param form The form to be handled
 */
// Add JSONP Callback to Window Element
window.logResult = (json) => {
  console.log(json);
  if (json.result === 'successs') {
    console.log('success -> log result');
  } else if (json.result === 'error') {
    console.log('error -> log result');
  }
};

export const customFormHandler = (form: HTMLFormElement) => {
  // Set Up Form Variables
  console.log('Adding Form Event Submit Handler to ' + form);
  const formAction: string | null = form.action;
  const formInputs: NodeListOf<HTMLElement> = form.querySelectorAll('input, select');
  const successElement: HTMLDivElement | null = form.parentElement
    ? form.parentElement.querySelector('[data-wup="success-block"]')
    : null;
  const failElement: HTMLDivElement | null = form.parentElement
    ? form.parentElement.querySelector('[data-wup="error-block"]')
    : null;
  const formSubmitButton: HTMLInputElement | null = form.querySelector(
    '[data-wup="form-submit-btn"]'
  );
  const honey: HTMLInputElement | null = form.querySelector('[data-wup="ohnohoney"]');

  console.log(
    `Action: ${formAction}`,
    `From Inputs: ${formInputs}`,
    `Success Element: ${successElement}`,
    `Fail Element: ${failElement}`,
    `Honey: ${honey}`,
    `Submit Button: ${formSubmitButton}`
  );

  // Create Submit Event
  form.addEventListener('submit', async (e) => {
    // Prevent default action
    console.log(e);
    e.preventDefault;

    // Craft full URL
    const requestURI = constructDataURI();
    const requestURL = formAction + '?' + requestURI;

    // Oh No Honey Check if it exists in form
    if (honey !== null) {
      if (honey.value.length < 1 || honey.value === '') {
        await makeAjaxRequest(requestURL);
      } else {
        console.error('Spam Detected');
        onFormError();
        return false;
      }
    } else {
      // Make and handle AJAX request - No Honey Present
      await makeAjaxRequest(requestURL);
    }
  });

  /**
   * Function To Make the JSONP AJAX Request to Pardot.
   * @param url The URL endpoint to hit
   */
  const makeAjaxRequest = async (url: string) => {
    console.log('Request string is ' + url);

    // fetchJsonp documentation can be found here ==> https://www.npmjs.com/package/fetch-jsonp
    fetchJsonp(url, {
      jsonpCallbackFunction: 'logResult',
    })
      .then(async (response) => response.json())
      .then((json) => {
        const state: string = json.result;
        if (state === 'success') {
          onFormSuccess();
        }
        if (state === 'error') {
          onFormError();
        }
      })
      .catch((err) => console.error('Error', err));
  };

  /**
   * Construts The Query String to be appended to Base URL
   * NOTE: Elements with the attribute of "ignore" will not be put into the query string
   *
   * @returns The data serialized and formated properly as a query string
   */
  const constructDataURI = () => {
    // Create Empty URI
    const dataURI: { [key: string]: string } = {};

    // Append Form Inputs to the URI
    formInputs.forEach((element) => {
      if (!element.hasAttribute('ignore')) {
        if (element instanceof HTMLInputElement) {
          dataURI[element.name] = element.value;
        }
        if (element instanceof HTMLSelectElement) {
          dataURI[element.name] = element.value;
        }
      }
    });
    // Append File Inputs to the URI - IF they exist
    // const filesInput = document.querySelector('[data-type]');
    // if (filesInput != null) {
    //   dataURI[filesInput.getAttribute('name')] = fileNames;
    //   dataURI = $.param(dataURI);
    // }

    // Serialize the URI
    const dataQueryString = new URLSearchParams(dataURI).toString();

    // Return URI after being converted into a query string
    return dataQueryString;
  };

  /**
   * Runs after form request returns "success"
   */
  const onFormSuccess = () => {
    form.style.display = 'none';
    if (successElement != null) {
      successElement.style.display = 'block';
    }
    if (failElement != null) {
      failElement.style.display = 'none';
    }
    if (formSubmitButton != null) {
      formSubmitButton.style.display = 'none';
    }

    // Set Cookies to track completed forms
    // if (!Cookies.get('formFiles')) {
    //   // const formValues = getFormData();
    //   Cookies.set('formFiles', formValues, { expires: 30 });
    // } else {
    //   // cookieData.itemsId.push(currentForm);
    //   Cookies.set('formFiles', cookieData, { expires: 30 });
    // }
    console.log('Form Success');
  };

  /**
   * Runs after form request returns "error"
   */
  const onFormError = () => {
    form.style.display = 'grid';
    if (successElement != null) {
      successElement.style.display = 'none';
    }
    if (failElement != null) {
      failElement.style.display = 'block';
    }
    if (formSubmitButton != null) {
      formSubmitButton.value = 'Submit';
    }
    console.error('Form Error');
  };
};

//TDL
// Reimplemenet Cookies
// Reimplement autofill capability
// Reimplemenet FILES data in url string
//TDL
