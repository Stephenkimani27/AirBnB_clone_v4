// USING parent methods to get parent text
/*
$('document').ready(function () {
  let checked_amenities = [];
  let amenity = '';
  $('INPUT#checked_amenity').change(function () {
    if (this.checked) {
      amenity = $(this).parent().text().trim();
      checked_amenities.push(amenity);
    } else {
      amenity = $(this).parent().text().trim();
      if (checked_amenities.length != 0) {
        checked_amenities = arrayRemove(checked_amenities, amenity);
      }
    }
    console.log(checked_amenities.join(', '));
    $('DIV.amenities H4').text(checked_amenities.join(', '));
  });
});

const arrayRemove = (arr, val) => {
  return arr.filter(cur => {
    return cur != val;
  });
};
*/
// Using array methods
/*
$('document').ready(function () {
  let checked_amenities = [];

  $('INPUT#checked_amenity').change(function () {
    if (this.checked) {
      checked_amenities.push($(this).attr('data-name'));
    } else {
      const index = checked_amenities.findIndex(cur => {
        return cur === $(this).attr('data-name');
      });
      checked_amenities.splice(index, 1);
    }
    $('DIV.amenities H4').text(checked_amenities.join(', '));
  });
});
*/

// Using object methods
// shorthand for $(document).ready()
$(function () {
  const checked_amenities = {};
  $('INPUT#checked_amenity').change(function () {
    if (this.checked) {
      const key = $(this).attr('data-id');
      checked_amenities[key] = $(this).attr('data-name');
    } else {
      delete checked_amenities[$(this).attr('data-id')];
    }
    console.log(Object.values(checked_amenities).join(', '));
    $('DIV.amenities H4').text(Object.values(checked_amenities).join(', '));
  });
});
