/* eslint-disable no-console */
// import * as Cookies from 'js-cookie';

import { customFormHandler } from '$utils/customFormHandler';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('Running Custom Form Handler');
  const forms: NodeListOf<HTMLFormElement> = document.querySelectorAll("[data-wup='form']");
  // If Forms Exist on the page
  if (forms.length > 0) {
    // Add JSONP Callback to Window Element
    window.logResult = (json) => {
      if (json.result === 'successs') {
        console.log('success -> log result');
      } else if (json.result === 'error') {
        console.log('error -> log result');
      }
    };
    forms.forEach((form) => {
      // Apply the AJAX Submission Handler to Each
      customFormHandler(form);
    });
  }
});
