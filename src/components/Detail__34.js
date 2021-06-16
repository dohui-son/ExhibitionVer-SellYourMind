import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import * as ENABLE3D from 'enable3d';
import { Scene } from 'three';
import img from '../material/texture/24.jpeg';
import wall from '../material/texture/b_watercolor.jpg';

//공감

import Stats from 'three/examples/jsm/libs/stats.module.js';

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
const Detail__34 = () => {
  useEffect(() => {
    let container, stats;
    let camera, scene, renderer;

    init();
    animate();

    function init() {
      container = document.createElement('div');
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

      const geometry = new THREE.SphereGeometry(10, 10, 10);

      for (let i = 0; i < 200; i++) {
        const object = new THREE.Mesh(
          geometry,
          new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
        );

        object.position.x = Math.random() * 1600 - 800;
        object.position.y = Math.random() * 900 - 450;
        object.position.z = Math.random() * 900 - 500;

        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;

        object.scale.x = Math.random() * 2 + 1;
        object.scale.y = Math.random() * 2 + 1;
        object.scale.z = Math.random() * 2 + 1;

        object.castShadow = true;
        object.receiveShadow = true;

        scene.add(object);
      }

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;

      container.appendChild(renderer.domElement);

      stats = new Stats();
      container.appendChild(stats.dom);

      window.addEventListener('resize', onWindowResize);
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
      stats.update();
    }

    function render() {
      renderer.render(scene, camera);
    }

    const selectionBox = new SelectionBox(camera, scene);
    const helper = new SelectionHelper(selectionBox, renderer, 'selectBox');

    document.addEventListener('pointerdown', function (event) {
      for (const item of selectionBox.collection) {
        item.material.emissive.set(0x000000);
      }

      selectionBox.startPoint.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      );
    });

    document.addEventListener('pointermove', function (event) {
      if (helper.isDown) {
        for (let i = 0; i < selectionBox.collection.length; i++) {
          selectionBox.collection[i].material.emissive.set(0x000000);
        }

        selectionBox.endPoint.set(
          (event.clientX / window.innerWidth) * 2 - 1,
          -(event.clientY / window.innerHeight) * 2 + 1,
          0.5
        );

        const allSelected = selectionBox.select();

        for (let i = 0; i < allSelected.length; i++) {
          allSelected[i].material.emissive.set(0xffffff);
        }
      }
    });

    document.addEventListener('pointerup', function (event) {
      selectionBox.endPoint.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      );

      const allSelected = selectionBox.select();

      for (let i = 0; i < allSelected.length; i++) {
        allSelected[i].material.emissive.set(0xffffff);
      }
    });
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);
  return <div className="detail-body"></div>;
};
export default Detail__34;
