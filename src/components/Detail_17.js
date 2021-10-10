import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { Scene } from 'three';
import img from '../material/texture/4.jpg';
import l17 from '../material/letter17.jpeg';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import '../stylesheet/detail.scss';
//import { VRButton } from './jsm/webxr/VRButton.js';

//import * as THREE from '../build/three.module.js';

//import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import { ImprovedNoise } from './jsm/math/ImprovedNoise.js';
const Detail_17 = () => {
  useEffect(() => {
    let container,
      flag = 0;

    let camera, controls, scene, renderer;

    let mesh, texture;

    const worldWidth = 256,
      worldDepth = 256,
      worldHalfWidth = worldWidth / 2,
      worldHalfDepth = worldDepth / 2;

    let helper;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    init();
    animate();

    function init() {
      container = document.getElementById('container');

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      //scene.background = new THREE.Color(img);

      texture = new THREE.TextureLoader().load(img);
      scene.background = new THREE.TextureLoader().load(img);
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        10,
        20000
      );

      controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 1000;
      controls.maxDistance = 10000;
      controls.maxPolarAngle = Math.PI / 2;

      //

      const data = generateHeight(worldWidth, worldDepth);

      controls.target.y =
        data[worldHalfWidth + worldHalfDepth * worldWidth] + 500;
      camera.position.y = controls.target.y + 2000;
      camera.position.x = 2000;
      controls.update();

      const geometry = new THREE.PlaneGeometry(
        15500,
        10500,
        worldWidth - 2,
        worldDepth - 2
      );
      geometry.rotateX(-Math.PI / 2);

      const vertices = geometry.attributes.position.array;

      for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
        vertices[j + 1] = data[i] * 10;
      }

      geometry.computeFaceNormals(); // needed for helper

      //
      texture = new THREE.TextureLoader().load(img);
      //texture = new THREE.CanvasTexture(generateTexture(data, worldWidth, worldDepth));
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ map: texture })
      );
      scene.add(mesh);

      const geometryHelper = new THREE.ConeGeometry(20, 190, 3);
      geometryHelper.translate(0, 50, 0);
      geometryHelper.rotateX(Math.PI / 2);
      helper = new THREE.Mesh(geometryHelper, new THREE.MeshNormalMaterial());

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
          window.location.href = 'sell_your_mind_research#/d3';
      };
      document.addEventListener('keydown', onKeyDown);

      container.addEventListener('pointermove', onPointerMove);
      document.addEventListener('keypress', onKeyPress);
      window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function generateHeight(width, height) {
      const size = width * height,
        data = new Uint8Array(size),
        perlin = new ImprovedNoise(),
        z = Math.random() * 100;

      let quality = 1;

      for (let j = 0; j < 4; j++) {
        for (let i = 0; i < size; i++) {
          const x = i % width,
            y = ~~(i / width);
          data[i] += Math.abs(
            perlin.noise(x / quality, y / quality, z) * quality * 1.75
          );
        }

        quality *= 5;
      }

      return data;
    }

    function generateTexture(data, width, height) {
      // bake lighting into texture

      let context, image, imageData, shade;

      const vector3 = new THREE.Vector3(0, 0, 0);

      const sun = new THREE.Vector3(1, 1, 1);
      sun.normalize();

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      context = canvas.getContext('2d');
      //context.fillStyle = '#000';
      context.fillStyle = 'img';
      context.fillRect(0, 0, width, height);

      image = context.getImageData(0, 0, canvas.width, canvas.height);
      imageData = image.data;

      for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
        vector3.x = data[j - 2] - data[j + 2];
        vector3.y = 2;
        vector3.z = data[j - width * 2] - data[j + width * 2];
        vector3.normalize();

        shade = vector3.dot(sun);

        imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007);
        imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007);
        imageData[i + 2] = shade * 96 * (0.5 + data[j] * 0.007);
      }

      context.putImageData(image, 0, 0);

      // Scaled 4x

      const canvasScaled = document.createElement('canvas');
      canvasScaled.width = width * 4;
      canvasScaled.height = height * 4;

      context = canvasScaled.getContext('2d');
      context.scale(4, 4);
      context.drawImage(canvas, 0, 0);

      image = context.getImageData(
        0,
        0,
        canvasScaled.width,
        canvasScaled.height
      );
      imageData = image.data;

      for (let i = 0, l = imageData.length; i < l; i += 4) {
        const v = ~~(Math.random() * 5);

        imageData[i] += v;
        imageData[i + 1] += v;
        imageData[i + 2] += v;
      }

      context.putImageData(image, 0, 0);

      return canvasScaled;
    }

    //

    function animate() {
      requestAnimationFrame(animate);

      render();
      // stats.update();
    }

    function render() {
      renderer.render(scene, camera);
    }

    function onPointerMove(event) {
      pointer.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
      pointer.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);

      // See if the ray from the camera into the world hits one of our meshes
      const intersects = raycaster.intersectObject(mesh);

      // Toggle rotation bool for meshes that we clicked
      if (intersects.length > 0) {
        helper.position.set(0, 0, 0);
        helper.lookAt(intersects[0].face.normal);

        helper.position.copy(intersects[0].point);
      }
    }
    // return () => {
    //   document.body.removeChild(renderer.domElement);
    // };
  }, []);
  return (
    <div className="detail-body" id="container">
      <div className="blocker" id="blocker">
        <div className="instructions" id="instructions">
          <img src={l17} alt="letter" />
        </div>
      </div>
    </div>
  );
};
export default Detail_17;
