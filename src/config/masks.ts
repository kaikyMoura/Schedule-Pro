/**
 * Contains the phone masks for each country
 *
 * I create this object because the masks are different for each country
 * and this can be useful in the future 
 * 
 * @type {Object}
 * */ 
export const phoneMasks: object = {
  BR: [
    { mask: '(00) 0000-0000' },
    { mask: '(00) 00000-0000' }
  ],
  US: {
    mask: '(000) 000-0000'
  }
  // More masks can be added here
};