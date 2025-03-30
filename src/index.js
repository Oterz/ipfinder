import 'babel-polyfill';
import { addOffset, getAddress, addTileLayer, validateIp } from './helpers';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');
const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const markerIcon = L.icon({
  iconUrl: new URL('../images/icon-location.svg', import.meta.url).href,
  iconSize: [30, 40],
});

const mapArea = document.querySelector('.map');

function getData() {
  if (validateIp(ipInput.value)) {
    getAddress(ipInput.value).then(setInfo);
  }
}

function handleKey(e) {
  if (e.key === 'Enter') {
    getData();
  }
}
let map;
let currentMarker;

function setInfo(mapData) {
  const { lat, lng, country, region, timezone } = mapData.location;

  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = country + ' ' + region;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp;

  if (!map) {
    map = L.map(mapArea, {
      center: [lat, lng],
      zoom: 13,
      zoomControl: false,
    });
    addTileLayer(map);
  } else {
    map.setView([lat, lng]);
  }

  if (currentMarker) {
    map.removeLayer(currentMarker);
  }

  currentMarker = L.marker([lat, lng], { icon: markerIcon }).addTo(map);

  if (matchMedia('(max-width: 1023px)').matches) {
    addOffset(map);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://api.ipify.org?format=json')
    .then((res) => res.json())
    .then((data) => getAddress(data.ip))
    .then(setInfo);
});
