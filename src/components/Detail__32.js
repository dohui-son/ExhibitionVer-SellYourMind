import React, { Component, useEffect } from 'react';
import * as THREE from 'three';

import img from '../material/texture/21.jpeg';
import '../stylesheet/writings.scss';

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
          window.location.href = 'sell_your_mind_research#/d38';
      };

      document.addEventListener('keypress', onKeyPress);
      document.addEventListener('keydown', onKeyDown);
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

  return (
    <div className="blocker" id="blocker">
      <div className="instructions" id="instructions">
        <div className="text">
          <h4>서울</h4>외로움은 항상 몇 발자국 떨어져 함께 있다. 사람들과 함께
          있더라도 그것이 나에게 다가오는 일은 별난 일이 아니다. 수시로 나를 또
          찾아오고 나는 또 힘들어한다. 동떨어져 길을 걷는 느낌이 들고 나만 이런
          걸까 하는 조바심. 뭐 외로웠다가도 금새 일상으로 돌아가는게 연속이지
          않겠어하는 생각과 함께 치부해버리고는 커피 한 모금. 스탠드불에
          커피만이 날 지탱해준 밤은 길고 긴데 빛 바랜 소설책은 바스락거릴
          뿐이다.
        </div>
      </div>
    </div>
  );
};
export default Detail_4;
