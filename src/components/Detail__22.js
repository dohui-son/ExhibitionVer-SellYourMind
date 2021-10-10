import React, { useEffect } from 'react';
import * as THREE from 'three';
import img from '../material/texture/18.jpg';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';

import '../stylesheet/detail.scss';
const Detail__22 = () => {
  useEffect(() => {
    let container,
      flag = 0;
    let camera, controls, scene, renderer;
    let mesh, texture;

    const worldWidth = 356, //256
      worldDepth = 256;
    const clock = new THREE.Clock();

    init();
    animate();

    function init() {
      container = document.getElementById('container');

      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );

      scene = new THREE.Scene();

      scene.background = new THREE.Color(0xffffff);
      //scene.background = new THREE.TextureLoader().load(img);
      scene.fog = new THREE.FogExp2(0xffffff, 0.0025);

      const data = generateHeight(worldWidth, worldDepth);

      camera.position.set(100, 800, -800);
      camera.lookAt(-100, 810, -800);

      const geometry = new THREE.PlaneGeometry(
        7500,
        7500,
        worldWidth - 1,
        worldDepth - 1
      );
      geometry.rotateX(-Math.PI / 2);

      const vertices = geometry.attributes.position.array;

      for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
        vertices[j + 1] = data[i] * 10;
      }
      texture = new THREE.TextureLoader().load(img);
      //texture = new THREE.CanvasTexture(generateTexture(data, worldWidth, worldDepth));
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ map: texture })
      );
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      controls = new FirstPersonControls(camera, renderer.domElement);
      controls.movementSpeed = 150;
      controls.lookSpeed = 0.1;

      // stats = new Stats();
      // container.appendChild(stats.dom);

      //
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
          window.location.href = 'sell_your_mind_research#/d21';
      };
      document.addEventListener('keypress', onKeyPress);

      //
      document.addEventListener('keydown', onKeyDown);

      window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      controls.handleResize();
    }

    function generateHeight(width, height) {
      let seed = Math.PI / 4;
      window.Math.random = function () {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
      };

      const size = width * height,
        data = new Uint8Array(size);
      const perlin = new ImprovedNoise(),
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
      let context, image, imageData, shade;

      const vector3 = new THREE.Vector3(0, 0, 0);

      const sun = new THREE.Vector3(1, 1, 1);
      sun.normalize();

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      context = canvas.getContext('2d');
      context.fillStyle = '#000';
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
      controls.update(clock.getDelta());
      renderer.render(scene, camera);
    }
  }, []);
  return (
    <div className="detail-body" id="container">
      <div className="blocker" id="blocker">
        <div className="instructions" id="instructions">
          <div className="text">
            <h4>섬유유연제</h4>맑은 하늘이 뜨면 먼저 하는 생각은 빨래. 나의 옷에
            보이지 않는 색을 빨아 깨끗이하는 과정은 귀찮지만 빨래향기는 안정감을
            준다. 저절로 나오는 콧노래는 이웃의 귀를 생각해 참아 보지만 그것도
            잠시, 자꾸자꾸 흥얼거림이 터져나와 버린다. 오랜만에 바꾼 섬유유연제
            향이 마음에 들어 기분이 좋다. 보이지 않는 향이 두둥실. 내 바로 앞에
            놓여있다는 걸 안다. 포근하다. 코를 파묻어 마구 부비고 미소 짓는다.
            낮잠에 들것만 같은 나른한 기분. 나른한 건 뽀송한 빨래 때문인가
            햇살때문인가.
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail__22;
