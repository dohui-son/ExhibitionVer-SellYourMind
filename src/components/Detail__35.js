import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import * as ENABLE3D from 'enable3d';
import { Scene } from 'three';
import img from '../material/texture/14.jpg';
import wall from '../material/texture/b_watercolor.jpg';

//공감

import Stats from 'three/examples/jsm/libs/stats.module.js';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera.js';
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js';
import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
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
const Detail__35 = () => {
  useEffect(() => {
    let camera, controls, scene, renderer, effect;

    let sphere, plane;

    const start = Date.now();

    init();
    animate();

    function init() {
      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.y = 150;
      camera.position.z = 500;

      scene = new THREE.Scene();
      const texture = new THREE.TextureLoader().load(img);
      scene.background = texture; //new THREE.Color( 0, 0, 0 );

      const pointLight1 = new THREE.PointLight(0xffffff);
      pointLight1.position.set(500, 500, 500);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xffffff, 0.25);
      pointLight2.position.set(-500, -500, -500);
      scene.add(pointLight2);

      sphere = new THREE.Mesh(
        new THREE.SphereGeometry(200, 20, 10),
        new THREE.MeshPhongMaterial({ flatShading: true })
      );
      scene.add(sphere);

      // Plane

      plane = new THREE.Mesh(
        new THREE.PlaneGeometry(400, 400),
        new THREE.MeshBasicMaterial({ color: 0xe0e0e0 })
      );
      plane.position.y = -200;
      plane.rotation.x = -Math.PI / 2;
      scene.add(plane);

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      effect = new AsciiEffect(renderer, ' l o v e', { invert: true });
      effect.setSize(window.innerWidth, window.innerHeight);
      effect.domElement.style.color = 'white';
      effect.domElement.style.backgroundColor = 'black';

      // Special case: append effect.domElement, instead of renderer.domElement.
      // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.

      document.body.appendChild(effect.domElement);

      controls = new TrackballControls(camera, effect.domElement);

      //

      window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
      effect.setSize(window.innerWidth, window.innerHeight);
    }

    //

    function animate() {
      requestAnimationFrame(animate);

      render();
    }

    function render() {
      const timer = Date.now() - start;

      sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
      sphere.rotation.x = timer * 0.0003;
      sphere.rotation.z = timer * 0.0002;

      controls.update();

      effect.render(scene, camera);
    }
  }, []);
  return <div className="detail-body" id="container"></div>;
};
export default Detail__35;
