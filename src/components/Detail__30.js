import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { Scene } from 'three';
import img from '../material/texture/22.jpeg';
import wall from '../material/texture/b_watercolor.jpg';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import '../stylesheet/detail.scss';
//import { VRButton } from './jsm/webxr/VRButton.js';

//import * as THREE from '../build/three.module.js';

//import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

//import { ImprovedNoise } from './jsm/math/ImprovedNoise.js';
const Detail__30 = () => {
  useEffect(() => {
    let controls, camera, scene, renderer;
    let textureEquirec, textureCube;
    let sphereMesh, sphereMaterial;
    const texture_img = new THREE.TextureLoader().load(img);

    init();
    animate();

    function init() {
      // CAMERAS

      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        100000
      );
      camera.position.set(0, 0, 1000);

      // SCENE

      scene = new THREE.Scene();

      // Lights

      const ambient = new THREE.AmbientLight(0xffffff);
      scene.add(ambient);

      // Textures

      const loader = new THREE.CubeTextureLoader();
      loader.setPath('textures/cube/Bridge2/');

      textureCube = texture_img; //loader.load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ] );
      textureCube.encoding = THREE.sRGBEncoding;

      const textureLoader = new THREE.TextureLoader();

      textureEquirec = texture_img; //textureLoader.load( 'textures/2294472375_24a3b8ef46_o.jpg' );
      textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
      textureEquirec.encoding = THREE.sRGBEncoding;

      scene.background = texture_img;

      //

      const geometry = new THREE.IcosahedronGeometry(400, 15);
      sphereMaterial = new THREE.MeshLambertMaterial({ map: texture_img }); //( { envMap: textureCube } );
      sphereMesh = new THREE.Mesh(geometry, sphereMaterial);
      scene.add(sphereMesh);

      //

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;
      document.body.appendChild(renderer.domElement);

      //

      controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 500;
      controls.maxDistance = 2500;

      //

      const params = {
        Cube: function () {
          scene.background = textureCube;

          sphereMaterial.envMap = textureCube;
          sphereMaterial.needsUpdate = true;
        },
        Equirectangular: function () {
          scene.background = textureEquirec;

          sphereMaterial.envMap = textureEquirec;
          sphereMaterial.needsUpdate = true;
        },
        Refraction: false,
      };

      const gui = new GUI();
      gui.add(params, 'Cube');
      gui.add(params, 'Equirectangular');
      gui.add(params, 'Refraction').onChange(function (value) {
        if (value) {
          textureEquirec.mapping = THREE.EquirectangularRefractionMapping;
          textureCube.mapping = THREE.CubeRefractionMapping;
        } else {
          textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
          textureCube.mapping = THREE.CubeReflectionMapping;
        }

        sphereMaterial.needsUpdate = true;
      });
      gui.open();

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
    }

    function render() {
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }
  }, []);
  return <div className="detail-body" id="container"></div>;
};
export default Detail__30;
