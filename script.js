$(function (){
  $("#id_sameAsOrderer").on("change", function () {
    if($(this).is(":checked")) {
      $("#id_pickupName, #id_pickupEmail, #id_pickupNumber").attr("disabled", "disabled");
      $("#id_pickupName, #id_pickupEmail, #id_pickupNumber").val("");
      $("#id_orderer, #id_ordererEmail, #id_phoneNumber").bind("input", function () {
        $($(this).data("pickup")).val($(this).val());
      });

      $("#id_orderer, #id_ordererEmail, #id_phoneNumber").each(function () {
        $($(this).data("pickup")).val($(this).val());
      });
    }
    else {
      $("#id_pickupName, #id_pickupEmail, #id_pickupNumber").removeAttr("disabled");
      $("#id_orderer, #id_ordererEmail, #id_phoneNumber").unbind("input");
    }
  });

  $("#id_orderer, #id_ordererEmail, #id_phoneNumber").bind("input", function () {
    $($(this).data("pickup")).val($(this).val());
  });

  $(".product").bind("input", function () {
    var quantity = parseInt($(this).val());
    if (isNaN(quantity) || quantity < 0) {
      $(this).val("");
    }

    calculateSum();
  });

  $("input[name=selected-products]").bind("change", function () {
    calculateSum();
  });

  $('[data-tooltip="menu"]').tooltip({'placement': 'bottom', 'trigger': 'hover'});

  $('#collapsible-navbar').on('hidden.bs.collapse', function () {
    alert("Hej");
  });

  $('.input-group.date').datepicker({
    autoclose: true,
    format: "yyyy-mm-dd",
    weekStart: 1,
    startDate: "0",
    endDate: "2015-12-18",
    maxViewMode: 1,
    todayBtn: "linked",
    language: "sv",
    daysOfWeekDisabled: "0,6",
    calendarWeeks: true,
    todayHighlight: true
    //datesDisabled: ['12/06/2015', '12/21/2015']
  });
});

function calculateSum() {
  var sum = 0;
  $("input[name=selected-products]:checked").each(function () {
    var target = $($(this).parent().data("target") + " input");
    sum += $(target).val() * $(target).data("price");
  });
  $("#sum").html(sum + " " + $("#sum").data("currency"));
}

function initialize() {
  var baljanLatLng = new google.maps.LatLng(58.4008713, 15.578388);

  var map = new google.maps.Map(document.getElementById('map-container'), {
    center: baljanLatLng,
    zoom: 18,
    scrollwheel: false,
    mapTypeControl: false,
    streetViewControl: false,
    styles: [{
      featureType: "poi",
      elementType: "labels",
      stylers: [
              { visibility: "off" }
        ]
    },{
      featureType: "transit",
      elementType: "labels",
      stylers: [
              { visibility: "off" }
        ]
    }]
  });

  var infowindow = new google.maps.InfoWindow();
  /*var service = new google.maps.places.PlacesService(map);

  service.getDetails({placeId: 'ChIJEVWHH29vWUYRxtSDTcmejw8'}, function(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }
  });*/
  
   var marker = new google.maps.Marker({
    map: map,
    position: baljanLatLng,
    title: "Sektionscafé Baljan"
  });
  var content = 
      '<div class="iw-container">\
<div class="iw-title">Sektionscafé Baljan</div>\
<div class="iw-content">\
<ul class="list-unstyled">\
<li><a href="https://www.facebook.com/sektionscafe.baljan">Facebook</a></li>\
<li><a href="https://twitter.com/liu_baljan">Twitter</a></li>\
<li><a href="#">Google Plus</a></li>\
</ul>\
  </div>\
  </div>';
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(content);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);