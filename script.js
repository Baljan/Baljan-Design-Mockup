$(function (){
  $("#id_sameAsOrderer").on("change", function () {
    if($(this).is(":checked")) {
      $("#id_pickupName, #id_pickupEmail, #id_pickupNumber").attr("disabled", "disabled");
      $("#id_pickupName, #id_pickupEmail, #id_pickupNumber").val("");
      $("#id_orderer, #id_ordererEmail, #id_phoneNumber").bind("input", function () {
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
});

function initialize() {
  var baljanLatLng = new google.maps.LatLng(58.4008713, 15.578388);
  /*var map = new google.maps.Map(document.getElementById('map-container'), {
    zoom: 18,
    center: baljanLatLng
  });
  var baljan = new.google.Place({
    place: "ChIJEVWHH29vWUYRxtSDTcmejw8"
  });
  var marker = new google.maps.Marker({
    //position: baljanLatLng,
    place: new google.maps.Place({placeId: })
    title: "Sektionscafé Baljan"
  });
  marker.setMap(map);*/
    
    
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