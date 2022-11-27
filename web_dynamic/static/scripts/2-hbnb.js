$(function () {
  $.get('http://0.0.0.0:5001/api/v1/status/', data => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
});
