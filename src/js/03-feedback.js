import throttle from 'lodash.throttle';
import * as storage from './storage';

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const ref = {
  feedbackForm: document.querySelector('.feedback-form'),
};

const onLocalStoreg = e => {
  let saveFeedbackForm = storage.load(LOCAL_STORAGE_KEY);
  if (saveFeedbackForm === undefined) {
    saveFeedbackForm = {};
  }
  saveFeedbackForm[e.target.name] = e.target.value;
  // console.log(saveFeedbackForm);
  storage.save(LOCAL_STORAGE_KEY, saveFeedbackForm);
};

initFeedbackForm();

ref.feedbackForm.addEventListener('input', throttle(onLocalStoreg, 500));

function initFeedbackForm() {
  const feedbackFormMess = storage.load(LOCAL_STORAGE_KEY);
  if (feedbackFormMess) {
    // console.log(feedbackFormMess);
    Object.entries(feedbackFormMess).forEach(([name, value]) => {
      ref.feedbackForm.elements[name].value = value;
    });
  }
}

const onfeedbackFormSubmit = e => {
  e.preventDefault();
  // const formData = new FormData(ref.feedbackForm);
  // formData.forEach((value, name) => console.log(value, name));
  console.log(storage.load(LOCAL_STORAGE_KEY));
  ref.feedbackForm.reset();
  storage.remove(LOCAL_STORAGE_KEY);
};

ref.feedbackForm.addEventListener('submit', onfeedbackFormSubmit);
