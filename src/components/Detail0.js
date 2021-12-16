import React, { useState, useEffect } from 'react';

import * as THREE from 'three';
import * as ENABLE3D from 'enable3d';
import { Scene } from 'three';
import img from '../material/texture/14.jpg';
import wall from '../material/texture/b_watercolor.jpg';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import l0 from '../material/l0.jpg';
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera.js';
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js';
import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

import '../stylesheet/detail.scss';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const Detail__35 = () => {
  let [letter, letterSet] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => {
      letterSet(false);
    }, 4000);
    let timer2 = setTimeout(() => {
      window.location.href = 'sell_your_mind_research#/d19';
    }, 30000);
    let container, stats;
    let camera, scene, renderer;
    let controls, water, sun, mesh;

    init();
    animate();

    function init() {
      document.body.style.cursor = 'none';
      document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
      });
      container = document.getElementById('container');

      //

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      container.appendChild(renderer.domElement);

      //

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        1,
        20000
      );
      camera.position.set(30, 30, 100);

      //

      sun = new THREE.Vector3();

      // Water
      const texture_img = new THREE.TextureLoader().load(img);

      const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
      mesh = new THREE.Mesh(
        waterGeometry,
        new THREE.MeshBasicMaterial({ map: texture_img })
      );

      water = new Water(waterGeometry, {
        map: texture_img,
        textureWidth: 912,
        textureHeight: 912,
        waterNormals: new THREE.TextureLoader().load(
          'texture_img',
          function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          }
        ),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined,
      });

      water.rotation.x = -Math.PI / 2;

      scene.add(water);

      // Skybox

      const sky = new Sky();
      sky.scale.setScalar(10000);
      scene.add(sky);

      const skyUniforms = sky.material.uniforms;

      skyUniforms['turbidity'].value = 10;
      skyUniforms['rayleigh'].value = 2;
      skyUniforms['mieCoefficient'].value = 0.005;
      skyUniforms['mieDirectionalG'].value = 0.8;

      const parameters = {
        elevation: 2,
        azimuth: 180,
      };

      const pmremGenerator = new THREE.PMREMGenerator(renderer);

      function updateSun() {
        const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
        const theta = THREE.MathUtils.degToRad(parameters.azimuth);

        sun.setFromSphericalCoords(1, phi, theta);

        sky.material.uniforms['sunPosition'].value.copy(sun);
        water.material.uniforms['sunDirection'].value.copy(sun).normalize();

        scene.environment = pmremGenerator.fromScene(sky).texture;
      }

      updateSun();

      //

      const geometry = new THREE.BoxGeometry(60, 60, 60);
      const material = new THREE.MeshStandardMaterial({
        map: texture_img,
        roughness: 100,
      });

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      //

      controls = new OrbitControls(camera, renderer.domElement);
      controls.maxPolarAngle = Math.PI * 0.495;
      controls.target.set(0, 10, 0);
      controls.minDistance = 40.0;
      controls.maxDistance = 200.0;
      controls.update();

      //

      // GUI

      //   const gui = new GUI();

      //   const folderSky = gui.addFolder('Sky');
      //   folderSky.add(parameters, 'elevation', 0, 90, 0.1).onChange(updateSun);
      //   folderSky.add(parameters, 'azimuth', -180, 180, 0.1).onChange(updateSun);
      //   folderSky.open();

      //   const waterUniforms = water.material.uniforms;

      //   const folderWater = gui.addFolder('Water');
      //   folderWater
      //     .add(waterUniforms.distortionScale, 'value', 0, 8, 0.1)
      //     .name('distortionScale');
      //   folderWater.add(waterUniforms.size, 'value', 0.1, 10, 0.1).name('size');
      //   folderWater.open();

      //

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
      const time = performance.now() * 0.001;

      mesh.position.y = Math.sin(time) * 20 + 5;
      mesh.rotation.x = time * 0.5;
      mesh.rotation.z = time * 0.51;

      water.material.uniforms['time'].value += 1.0 / 60.0;

      renderer.render(scene, camera);
    }
    return () => {
      //document.body.removeChild(renderer.domElement);
    };
  }, []);
  return (
    <div>
      <div className="detail-body" id="container">
        {letter === true ? (
          <div className="blocker" id="blocker">
            <div className="instructions" id="instructions">
              <img src={l0} alt="letter" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Detail__35;
