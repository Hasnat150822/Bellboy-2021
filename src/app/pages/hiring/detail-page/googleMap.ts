var map: google.maps.Map;
var center: google.maps.LatLngLiteral;
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export function initMapSingleMarker(position, mapDiv) {
    //we need mpa id DOM, center, marker positions
    if(!mapDiv) return;
    map = new google.maps.Map(mapDiv as HTMLElement, {
    center:position,
    zoom: 10 
    });
    let marker =   new google.maps.Marker({
        position,
        map
    });
    return marker;
}

export function initPolyLines(locations:google.maps.LatLngLiteral[], startTaskPoint, mapDiv) {
    let avgLat:number = 0;
    let avgLng:number = 0;
    locations.forEach(element => {
        avgLat += +element.lat;
        avgLng += +element.lng;
    });
    avgLat = +(avgLat/locations.length).toFixed(4);
    avgLng = +(avgLng/locations.length).toFixed(4);
    //we need mpa id DOM, center, marker positions
    if(!mapDiv) return;
    if(avgLat && avgLng){
        map = new google.maps.Map(
            mapDiv as HTMLElement,
            {
              zoom: 15,
              center: {
                lat:avgLat,
                lng:avgLng
            },
            }
          );
    }
    if(startTaskPoint){
        const marker1 = new google.maps.Marker({
            position:startTaskPoint,
            map
        });
    }
    const marker2 = new google.maps.Marker({
        position:locations[0],
        map,
        icon:{
            url:'../../../../assets/img/ico/map-marker/running.png'
        }
    });
    const marker3 = new google.maps.Marker({
        position:locations[locations.length-1],
        map,
        icon:{
            url:'../../../../assets/img/ico/map-marker/running2.png'
        }
    });
    //create markers
    locations.forEach((position)=>{
        let marker =   new google.maps.Marker({
            position,
            map,
            icon:{
                url:'../../../../assets/img/ico/map-marker/blue-marker.png',
                scaledSize: new google.maps.Size(11,11)
            }
        });
    })
    // Create the polylines
    const polyLine = new google.maps.Polyline({
    path: locations,
    geodesic: true,
    strokeColor: "#FA9008",
    strokeOpacity: 1.0,
    strokeWeight: 2,
    });
    polyLine.setMap(map);
}