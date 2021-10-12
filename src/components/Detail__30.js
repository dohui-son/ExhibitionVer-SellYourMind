import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { Scene } from 'three';
import img from '../material/texture/22.jpeg';
import l3 from '../material/letter30.jpeg';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import '../stylesheet/detail.scss';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

const Detail__30 = () => {
  useEffect(() => {
    let controls,
      camera,
      scene,
      renderer,
      flag = 0;
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
        } else if (event.code === 'KeyF') {
          window.location.href = 'sell_your_mind_research#/d29';
        }
      };

      // const onKeyDown = function (event) {
      //   if (event.code === 'KeyF')
      //     window.location.href = 'sell_your_mind_research#/d29';
      // };

      //
      //document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keypress', onKeyPress);
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
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);
  return (
    <div className="detail-body" id="container">
      <div className="blocker" id="blocker">
        <div className="instructions" id="instructions">
          <img src={l3} alt="background_img" />
        </div>
      </div>
    </div>
  );
};
export default Detail__30;
