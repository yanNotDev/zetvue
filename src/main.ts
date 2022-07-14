import './style.css';
import * as THREE from 'three';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lights

// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(5, 5, 5);
// scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);


// Background

const spaceTexture = new THREE.TextureLoader().load('assets/space.jpg');
scene.background = spaceTexture;

const cube = new THREE.BoxGeometry(9, 9, 9);
const cuboid = new THREE.BoxGeometry(16, 9, 9);

const deftu = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/deftu.jpg') });
const polyfrost = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/polyfrost.jpg') });
const shinya = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/shinya.jpg') });
const tuxo = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/tuxo.png') });
const skyclient = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/skyclient.jpg') });

const zetvueLogo = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/zetvue.jpg') });
const zetvueBanner = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/zetvuebanner.jpg') });

const zetvue = new THREE.Mesh(cuboid, [zetvueLogo, zetvueLogo, zetvueBanner, zetvueBanner, zetvueBanner, zetvueBanner]);

scene.add(zetvue);

zetvue.position.z = -45;

zetvue.rotation.x += 0.5;
zetvue.rotation.y += 0.05;
zetvue.rotation.z += 0.5;

const toxicLogo = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/toxic.jpg') });
const toxicBanner = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/toxicbanner.jpg') });
const toxicArray = [toxicLogo, toxicLogo, toxicBanner, toxicBanner, toxicBanner, toxicBanner];

const toxic = new THREE.Mesh(cuboid, toxicArray);

scene.add(toxic);

toxic.position.x += 30;
toxic.position.y += 15;
toxic.position.z = -50;

toxic.rotation.x += 1;
toxic.rotation.z += -5;

const maxLogo = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/max.jpg') });
const maxBanner = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/maxbanner.jpg') });
const maxArray = [maxLogo, maxLogo, maxBanner, maxBanner, maxBanner, maxBanner];

const max = new THREE.Mesh(cuboid, maxArray);

scene.add(max);

max.position.x += -20;
max.position.y += 10;
max.position.z = -55;

max.rotation.x += 1;
max.rotation.z += -5;

const nelertile = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('assets/nelertile.jpg') });

const logos = new THREE.Mesh(cube, [deftu, polyfrost, shinya, tuxo, skyclient, nelertile]);

scene.add(logos);

logos.position.z = -50;
logos.position.x += 30;

// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  zetvue.rotation.x += 0.005;
  zetvue.rotation.y += 0.0075;
  zetvue.rotation.z += 0.005;

  toxic.rotation.x += 0.005;
  toxic.rotation.y += 0.0075;
  toxic.rotation.z += 0.005;

  max.rotation.x += 0.005;
  max.rotation.y += 0.0075;
  max.rotation.z += 0.005;

  camera.position.x = t * 0.0002;
  camera.rotation.y = t * 0.00007;
  camera.position.z = t * 0.01;
}

document.body.onscroll = moveCamera;
moveCamera();

var stars = [];
function addSphere() {
  var starGeometry = new THREE.SphereGeometry(0.5, 32, 32)
  var starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  for (var z = -1000; z < 1000; z += 20) {
    var sphere = new THREE.Mesh(starGeometry, starMaterial)

    sphere.position.x = Math.random() * 1000 - 500;
    sphere.position.y = Math.random() * 1000 - 500;

    sphere.position.z = z;
    sphere.scale.x = sphere.scale.y = 2;
    scene.add(sphere);
    stars.push(sphere);
  }
}

function animateStars() {
  for (var i = 0; i < stars.length; i++) {
    let star = stars[i];
    star.position.z += i / 10;
    if (star.position.z > 1000) star.position.z -= 2000;
  }
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

// Animation Loop
function animate() {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  requestAnimationFrame(animate);

  logos.rotation.x += 0.005;
  logos.rotation.z += 0.005;

  renderer.render(scene, camera);
  animateStars();
}

addSphere();
animate();