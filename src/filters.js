import Vue from 'vue';

Vue.filter('naira', value => {
  if (typeof value !== 'number') {
    return value;
  }
  const formatter = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'NGN'
  });
  return formatter.format(value);
});

Vue.filter('nairaFormat', value => {
  const newValue = parseFloat(value.toFixed(2));

  return `₦${newValue.toLocaleString('en')}`;
});

Vue.filter('displayNumber', value => {
  if (typeof value !== 'number') {
    return value;
  }
  return value.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
});
