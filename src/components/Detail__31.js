import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { Scene } from 'three';
import img from '../material/texture/25.jpeg';
// import wall from '../material/texture/b_watercolor.jpg';

// import Stats from 'three/examples/jsm/libs/stats.module.js';

//악세사리
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
const Detail__31 = () => {
  useEffect(() => {
    let container,
      flag = 0;
    let camera, scene, renderer;
    let controls, group;
    let enableSelection = false;

    const objects = [];

    const mouse = new THREE.Vector2(),
      raycaster = new THREE.Raycaster();

    init();

    function init() {
      container = document.createElement('div');
      container.id = 'div';
      document.body.appendChild(container);

      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        5000
      );
      camera.position.z = 1000;

      scene = new THREE.Scene();

      const s_texture = new THREE.TextureLoader().load(img);
      scene.background = s_texture;

      scene.add(new THREE.AmbientLight(0x505050));

      const light = new THREE.SpotLight(0xffffff, 1.5);
      light.position.set(0, 500, 2000);
      light.angle = Math.PI / 9;

      light.castShadow = true;
      light.shadow.camera.near = 1000;
      light.shadow.camera.far = 4000;
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;

      scene.add(light);

      group = new THREE.Group();
      scene.add(group);

      const geometry = new THREE.BoxGeometry(40, 40, 40);

      for (let i = 0; i < 200; i++) {
        const object = new THREE.Mesh(
          geometry,
          new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
        );

        object.position.x = Math.random() * 1000 - 500;
        object.position.y = Math.random() * 600 - 300;
        object.position.z = Math.random() * 800 - 400;

        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;

        object.scale.x = Math.random() * 2 + 1;
        object.scale.y = Math.random() * 2 + 1;
        object.scale.z = Math.random() * 2 + 1;

        object.castShadow = true;
        object.receiveShadow = true;

        scene.add(object);

        objects.push(object);
      }

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;

      container.appendChild(renderer.domElement);

      controls = new DragControls([...objects], camera, renderer.domElement);
      controls.addEventListener('drag', render);

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
        }
      };
      const onKeyDown = function (event) {
        if (event.code === 'KeyF')
          window.location.href = 'sell_your_mind_research#/d22';
      };
      document.addEventListener('keypress', onKeyPress);

      //

      //

      window.addEventListener('resize', onWindowResize);

      document.addEventListener('click', onClick);
      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);

      render();
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      render();
    }

    function onKeyDown(event) {
      enableSelection = event.keyCode === 16 ? true : false;
    }

    function onKeyUp() {
      enableSelection = false;
    }

    function onClick(event) {
      event.preventDefault();

      if (enableSelection === true) {
        const draggableObjects = controls.getObjects();
        draggableObjects.length = 0;

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersections = raycaster.intersectObjects(objects, true);

        if (intersections.length > 0) {
          const object = intersections[0].object;

          if (group.children.includes(object) === true) {
            object.material.emissive.set(0x000000);
            scene.attach(object);
          } else {
            object.material.emissive.set(0xaaaaaa);
            group.attach(object);
          }

          controls.transformGroup = true;
          draggableObjects.push(group);
        }

        if (group.children.length === 0) {
          controls.transformGroup = false;
          draggableObjects.push(...objects);
        }
      }

      render();
    }

    function render() {
      renderer.render(scene, camera);
    }
    return () => {
      var toerase = document.getElementById('div');
      toerase.remove();
    };
  }, []);
  return (
    <div className="detail-body" id="container">
      <div className="blocker" id="blocker">
        <div className="instructions" id="instructions">
          <div className="text">
            <h4>나이는 항상 7살</h4>운동회, 하고 싶은거 다하는 삶을 살거야.
            뚱땅뚱땅 어설픈 발걸음은 당차다. 뒷모습에서 초등학교 운동회에서의
            활기가 잠깐 보였다. 허공에 휘두르는 팔에 주먹을 꽉 진 손이
            인상적이다. 여러 사람, 여러 목표가 보인다. 다채로운 사람들. 모두
            저마다의 활기를 갖고 숲을 이룬다. 나도 다시 시작해볼까 기지개를
            피어본다. 마냥 어리게 보겠지. 하지만 돌아,돌아 나이를 먹어도, 치매가
            찾아와도, 가슴속에 동요는 흐르고. 점점 어려지는 우리 할머니도
            그렇겠지.
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail__31;
