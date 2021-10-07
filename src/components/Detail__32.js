import React, { Component, useEffect } from 'react';
import * as THREE from 'three';

import img from '../material/texture/21.jpeg';
import '../stylesheet/writings.scss';
import '../stylesheet/detail.scss';
//도시의 첫인상

import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Detail_4 = () => {
  useEffect(() => {
    let camera,
      controls,
      scene,
      renderer,
      flag = 0;

    init();
    animate();

    function init() {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xcccccc);
      scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.set(400, 200, 0);

      controls = new MapControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;

      controls.minDistance = 100;
      controls.maxDistance = 500;
      controls.maxPolarAngle = Math.PI / 2;

      const blocker = document.getElementById('blocker');
      const instructions = document.getElementById('instructions');
      instructions.style.display = 'none';
      blocker.style.display = 'none';
      // world

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      geometry.translate(0, 0.5, 0);
      const texture = new THREE.TextureLoader().load(img);
      const material = new THREE.MeshPhongMaterial({
        map: texture,
        flatShading: true,
      }); //( { color: 0xffffff, flatShading: true } );

      for (let i = 0; i < 500; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 1600 - 800;
        mesh.position.y = 0;
        mesh.position.z = Math.random() * 1600 - 800;
        mesh.scale.x = 20;
        mesh.scale.y = Math.random() * 800 + 10;
        mesh.scale.z = 20;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        scene.add(mesh);
      }

      // lights

      const dirLight1 = new THREE.DirectionalLight(0xffffff);
      dirLight1.position.set(1, 1, 1);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0x002288);
      dirLight2.position.set(-1, -1, -1);
      scene.add(dirLight2);

      const ambientLight = new THREE.AmbientLight(0x222222);
      scene.add(ambientLight);

      const onKeyPress = function (event) {
        if (event.code === 'Tab') {
          window.location.href = 'sell_your_mind_research#/d38';
        }
        if (event.code === 'KeyA' && !flag) {
          blocker.style.display = 'block';
          instructions.style.display = '';
          flag = 1;
        } else if (event.code === 'KeyA' && flag) {
          blocker.style.display = 'none';
          instructions.style.display = 'none';
          flag = 0;
        }
      };

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

      controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

      render();
    }

    function render() {
      renderer.render(scene, camera);
    }
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);
  // return <div className="detail-body"></div>;
  return (
    <div className="blocker" id="blocker">
      <div className="instructions" id="instructions">
        <p>"지우개"로 작품화면으로 돌아가세요. </p>
        <br />
        <p>You can go back to the ART PIECE by the "ERASER"</p>
      </div>
    </div>
  );
};
export default Detail_4;
