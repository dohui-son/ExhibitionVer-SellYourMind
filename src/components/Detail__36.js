import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import * as ENABLE3D from 'enable3d';
import { Scene } from 'three';
import img from '../material/texture/20.jpeg';
import wall from '../material/texture/b_watercolor.jpg';

//공감

import Stats from 'three/examples/jsm/libs/stats.module.js';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera.js';
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js';
import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { Refractor } from 'three/examples/jsm/objects/Refractor.js';
import { WaterRefractionShader } from 'three/examples/jsm/shaders/WaterRefractionShader.js';
import {
  VOXLoader,
  VOXDataTexture3D,
} from 'three/examples/jsm/loaders/VOXLoader.js';
import '../stylesheet/detail.scss';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
//import { VRButton } from './jsm/webxr/VRButton.js';

//import { AmmoPhysics } from ENABLE3D;
//import * as THREE from '../build/three.module.js';

//import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { WEBGL } from 'three/examples/jsm/WebGL.js';

import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';

//import { ImprovedNoise } from './jsm/math/ImprovedNoise.js';
const Detail__36 = () => {
  useEffect(() => {
    let camera, scene, renderer, bulbLight, bulbMat, hemiLight, stats;
    let ballMat, cubeMat, floorMat;

    let previousShadowMap = false;

    // ref for lumens: http://www.power-sure.com/lumens.htm
    const bulbLuminousPowers = {
      '110000 lm (1000W)': 110000,
      '3500 lm (300W)': 3500,
      '1700 lm (100W)': 1700,
      '800 lm (60W)': 800,
      '400 lm (40W)': 400,
      '180 lm (25W)': 180,
      '20 lm (4W)': 20,
      Off: 0,
    };

    // ref for solar irradiances: https://en.wikipedia.org/wiki/Lux
    const hemiLuminousIrradiances = {
      '0.0001 lx (Moonless Night)': 0.0001,
      '0.002 lx (Night Airglow)': 0.002,
      '0.5 lx (Full Moon)': 0.5,
      '3.4 lx (City Twilight)': 3.4,
      '50 lx (Living Room)': 50,
      '100 lx (Very Overcast)': 100,
      '350 lx (Office Room)': 350,
      '400 lx (Sunrise/Sunset)': 400,
      '1000 lx (Overcast)': 1000,
      '18000 lx (Daylight)': 18000,
      '50000 lx (Direct Sun)': 50000,
    };

    const params = {
      shadows: true,
      exposure: 0.68,
      bulbPower: Object.keys(bulbLuminousPowers)[4],
      hemiIrradiance: Object.keys(hemiLuminousIrradiances)[0],
    };

    init();
    animate();

    function init() {
      const container = document.getElementById('container');

      stats = new Stats();
      container.appendChild(stats.dom);

      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.x = -4;
      camera.position.z = 4;
      camera.position.y = 2;

      scene = new THREE.Scene();

      const bulbGeometry = new THREE.SphereGeometry(0.02, 16, 8);
      bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2);

      bulbMat = new THREE.MeshStandardMaterial({
        emissive: 0xffffee,
        emissiveIntensity: 1,
        color: 0x000000,
      });
      bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
      bulbLight.position.set(0, 2, 0);
      bulbLight.castShadow = true;
      scene.add(bulbLight);
      const ambientLight = new THREE.AmbientLight(0xcccccc);
      scene.add(ambientLight);

      hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.02);
      scene.add(hemiLight);
      const texture_img = new THREE.TextureLoader().load(img);

      floorMat = new THREE.MeshStandardMaterial({
        //roughness: 0.8,
        map: texture_img,
        // metalness: 0.2,
        // bumpScale: 0.0005
      });
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load('textures/hardwood2_diffuse.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        map.encoding = THREE.sRGBEncoding;
        floorMat.map = map;
        floorMat.needsUpdate = true;
      });
      textureLoader.load('textures/hardwood2_bump.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        floorMat.bumpMap = map;
        floorMat.needsUpdate = true;
      });
      textureLoader.load(img, function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        floorMat.roughnessMap = map;
        floorMat.needsUpdate = true;
      });

      cubeMat = new THREE.MeshStandardMaterial({
        roughness: 0.7,
        color: 0xffffff,
        bumpScale: 0.002,
        metalness: 0.2,
      });
      textureLoader.load('textures/brick_diffuse.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(1, 1);
        map.encoding = THREE.sRGBEncoding;
        cubeMat.map = map;
        cubeMat.needsUpdate = true;
      });
      textureLoader.load('textures/brick_bump.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(1, 1);
        cubeMat.bumpMap = map;
        cubeMat.needsUpdate = true;
      });

      ballMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.5,
        metalness: 1.0,
      });
      textureLoader.load(img, function (map) {
        map.anisotropy = 4;
        map.encoding = THREE.sRGBEncoding;
        ballMat.map = map;
        ballMat.needsUpdate = true;
      });
      textureLoader.load(img, function (map) {
        map.anisotropy = 4;
        map.encoding = THREE.sRGBEncoding;
        ballMat.metalnessMap = map;
        ballMat.needsUpdate = true;
      });

      const floorGeometry = new THREE.PlaneGeometry(20, 20);
      const floorMesh = new THREE.Mesh(floorGeometry, floorMat);
      floorMesh.receiveShadow = true;
      floorMesh.rotation.x = -Math.PI / 2.0;
      scene.add(floorMesh);

      const ballGeometry = new THREE.SphereGeometry(0.25, 32, 32);
      const ballMesh = new THREE.Mesh(ballGeometry, ballMat);
      ballMesh.position.set(1, 0.25, 1);
      ballMesh.rotation.y = Math.PI;
      ballMesh.castShadow = true;
      scene.add(ballMesh);

      const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const boxMesh = new THREE.Mesh(boxGeometry, cubeMat);
      boxMesh.position.set(-0.5, 0.25, -1);
      boxMesh.castShadow = true;
      scene.add(boxMesh);

      const boxMesh2 = new THREE.Mesh(boxGeometry, cubeMat);
      boxMesh2.position.set(0, 0.25, -5);
      boxMesh2.castShadow = true;
      scene.add(boxMesh2);

      const boxMesh3 = new THREE.Mesh(boxGeometry, cubeMat);
      boxMesh3.position.set(7, 0.25, 0);
      boxMesh3.castShadow = true;
      scene.add(boxMesh3);

      renderer = new THREE.WebGLRenderer();
      renderer.physicallyCorrectLights = true;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.shadowMap.enabled = true;
      renderer.toneMapping = THREE.ReinhardToneMapping;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 1;
      controls.maxDistance = 20;

      window.addEventListener('resize', onWindowResize);

      const gui = new GUI();

      gui.add(params, 'hemiIrradiance', Object.keys(hemiLuminousIrradiances));
      gui.add(params, 'bulbPower', Object.keys(bulbLuminousPowers));
      gui.add(params, 'exposure', 0, 1);
      gui.add(params, 'shadows');
      gui.open();
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    //

    function animate() {
      requestAnimationFrame(animate);

      render();
    }

    function render() {
      renderer.toneMappingExposure = Math.pow(params.exposure, 5.0); // to allow for very bright scenes.
      renderer.shadowMap.enabled = params.shadows;
      bulbLight.castShadow = params.shadows;

      if (params.shadows !== previousShadowMap) {
        ballMat.needsUpdate = true;
        cubeMat.needsUpdate = true;
        floorMat.needsUpdate = true;
        previousShadowMap = params.shadows;
      }

      bulbLight.power = bulbLuminousPowers[params.bulbPower];
      bulbMat.emissiveIntensity = bulbLight.intensity / Math.pow(0.02, 2.0); // convert from intensity to irradiance at bulb surface

      hemiLight.intensity = hemiLuminousIrradiances[params.hemiIrradiance];
      const time = Date.now() * 0.0005;

      bulbLight.position.y = Math.cos(time) * 0.75 + 1.25;

      renderer.render(scene, camera);

      stats.update();
    }
    // return () => {
    //   document.body.removeChild(renderer.domElement);
    // };
  }, []);
  return <div className="detail-body" id="container"></div>;
};
export default Detail__36;
