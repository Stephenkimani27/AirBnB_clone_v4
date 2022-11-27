$('document').ready(function () {
  const api = 'http://' + window.location.hostname;
  $.get(api + ':5001/api/v1/places_search/', data => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: api + ':5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: appendPlaces,
  });

  const checked_amenities = {};
  $('INPUT#checked_amenity').change(function () {
    if (this.checked) {
      const key = $(this).attr('data-id');
      checked_amenities[key] = $(this).attr('data-name');
    } else {
      delete checked_amenities[$(this).attr('data-id')];
    }
    if (Object.values(checked_amenities).length === 0) {
      $('.amenities H4').html('&nbsp;');
    } else {
      $('.amenities H4').text(Object.values(checked_amenities).join(', '));
    }
  });

  $('BUTTON').click(function () {
    $.ajax({
      url: api + ':5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify({ amenities: Object.keys(checked_amenities) }),
      contentType: 'application/json',
      dataType: 'json',
      success: serachPlaces,
    });
  });
});

function serachPlaces(data) {
  $('SECTION.places').empty();
  $('SECTION.places').append(
    data.map(place => {
      return `<ARTICLE>
                  <DIV class="title">
                    <H2>${place.name}</H2>
                    <DIV class="price_by_night">
                      ${place.price_by_night}
                    </DIV>
                  </DIV>
                  <DIV class="information">
                    <DIV class="max_guest">
                      <I class="fa fa-users fa-3x" aria-hidden="true"></I>
                      </BR>
                      ${place.max_guest} Guests
                    </DIV>
                    <DIV class="number_rooms">
                      <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
                      </BR>
                      ${place.number_rooms} Bedrooms
                    </DIV>
                    <DIV class="number_bathrooms">
                      <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
                      </BR>
                      ${place.number_bathrooms} Bathrooms
                    </DIV>
                  </DIV>
                  <DIV class="description">
                    ${place.description}
                  </DIV>
                </ARTICLE>`;
    })
  );
}
