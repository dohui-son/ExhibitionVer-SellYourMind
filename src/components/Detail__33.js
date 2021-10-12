import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { Scene } from 'three';
import img from '../material/texture/34.jpeg';
import l33 from '../material/letter33.jpeg';

import Stats from 'three/examples/jsm/libs/stats.module.js';
//짝사랑

import '../stylesheet/detail.scss';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
//import { VRButton } from './jsm/webxr/VRButton.js';

//import * as THREE from '../build/three.module.js';

//import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { WEBGL } from 'three/examples/jsm/WebGL.js';

import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';

//import { ImprovedNoise } from './jsm/math/ImprovedNoise.js';
const Detail__33 = () => {
  useEffect(() => {
    let flag = 0,
      clock;
    let scene, camera, renderer, mixer;

    init();
    animate();

    function init() {
      scene = new THREE.Scene();

      //

      camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.set(25, 25, 50);
      camera.lookAt(scene.position);

      const s_texture = new THREE.TextureLoader().load(img);
      scene.background = s_texture;

      //

      const axesHelper = new THREE.AxesHelper(10);
      scene.add(axesHelper);

      //

      const geometry = new THREE.BoxGeometry(5, 5, 5);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // create a keyframe track (i.e. a timed sequence of keyframes) for each animated property
      // Note: the keyframe track type should correspond to the type of the property being animated

      // POSITION
      const positionKF = new THREE.VectorKeyframeTrack(
        '.position',
        [0, 1, 2],
        [0, 0, 0, 30, 0, 0, 0, 0, 0]
      );

      // SCALE
      const scaleKF = new THREE.VectorKeyframeTrack(
        '.scale',
        [0, 1, 2],
        [1, 1, 1, 2, 2, 2, 1, 1, 1]
      );

      // ROTATION
      // Rotation should be performed using quaternions, using a THREE.QuaternionKeyframeTrack
      // Interpolating Euler angles (.rotation property) can be problematic and is currently not supported

      // set up rotation about x axis
      const xAxis = new THREE.Vector3(1, 0, 0);

      const qInitial = new THREE.Quaternion().setFromAxisAngle(xAxis, 0);
      const qFinal = new THREE.Quaternion().setFromAxisAngle(xAxis, Math.PI);
      const quaternionKF = new THREE.QuaternionKeyframeTrack(
        '.quaternion',
        [0, 1, 2],
        [
          qInitial.x,
          qInitial.y,
          qInitial.z,
          qInitial.w,
          qFinal.x,
          qFinal.y,
          qFinal.z,
          qFinal.w,
          qInitial.x,
          qInitial.y,
          qInitial.z,
          qInitial.w,
        ]
      );

      // COLOR
      const colorKF = new THREE.ColorKeyframeTrack(
        '.material.color',
        [0, 1, 2],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        THREE.InterpolateDiscrete
      );

      // OPACITY
      const opacityKF = new THREE.NumberKeyframeTrack(
        '.material.opacity',
        [0, 1, 2],
        [1, 0, 1]
      );

      // create an animation sequence with the tracks
      // If a negative time value is passed, the duration will be calculated from the times of the passed tracks array
      const clip = new THREE.AnimationClip('Action', 3, [
        scaleKF,
        positionKF,
        quaternionKF,
        colorKF,
        opacityKF,
      ]);

      // setup the THREE.AnimationMixer
      mixer = new THREE.AnimationMixer(mesh);

      // create a ClipAction and set it to play
      const clipAction = mixer.clipAction(clip);
      clipAction.play();

      //

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
      document.exitPointerLock();

      clock = new THREE.Clock();
      const blocker = document.getElementById('blocker');
      const instructions = document.getElementById('instructions');
      instructions.style.display = 'none';
      blocker.style.display = 'none';
      const onKeyPress = function (event) {
        if (event.code === 'KeyG' && !flag) {
          blocker.style.display = 'block';
          instructions.style.display = '';
          flag = 1;
        } else if (event.code === 'KeyG' && flag) {
          blocker.style.display = 'none';
          instructions.style.display = 'none';
          flag = 0;
        } else if (event.code === 'KeyF')
          window.location.href = 'sell_your_mind_research#/d23';
      };
      // const onKeyDown = function (event) {
      //   if (event.code === 'KeyF')
      //     window.location.href = 'sell_your_mind_research#/d23';
      // };
      // document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keypress', onKeyPress);
      window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);

      render();
    }

    function render() {
      const delta = clock.getDelta();

      if (mixer) {
        mixer.update(delta);
      }

      renderer.render(scene, camera);

      // stats.update();
    }
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);
  return (
    <div className="detail-body" id="container">
      <div className="blocker" id="blocker">
        <div className="instructions" id="instructions">
          <img src={l33} alt="letter" />
        </div>
      </div>
    </div>
  );
};
export default Detail__33;
