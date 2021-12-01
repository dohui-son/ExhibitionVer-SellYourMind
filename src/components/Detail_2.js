import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { Scene } from 'three';
import img from '../material/texture/33.png';
import l2 from '../material/letter2.png';
import wall2 from '../material/texture/wall2.jpg';

import '../stylesheet/detail.scss';
//import { VRButton } from './jsm/webxr/VRButton.js';
const Detail_2 = () => {
  useEffect(() => {
    let camera, scene, renderer;
    let cube,
      flag = 0,
      material;

    let count = 0,
      cubeCamera1,
      cubeCamera2,
      cubeRenderTarget1,
      cubeRenderTarget2;

    let onPointerDownPointerX,
      onPointerDownPointerY,
      onPointerDownLon,
      onPointerDownLat;

    let lon = 0,
      lat = 0;
    let phi = 0,
      theta = 0;

    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(img, function (texture) {
      texture.encoding = THREE.sRGBEncoding;
      texture.mapping = THREE.EquirectangularReflectionMapping;

      init(texture);
      animate();
    });

    function init(texture) {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        premultipliedAlpha: false,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;
      document.body.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      scene.background = texture;

      camera = new THREE.PerspectiveCamera(
        100,
        window.innerWidth / window.innerHeight,
        -10000,
        1000000000
      );

      //

      cubeRenderTarget1 = new THREE.WebGLCubeRenderTarget(256, {
        format: THREE.RGBFormat,
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter,
        encoding: THREE.sRGBEncoding, // temporary -- to prevent the material's shader from recompiling every frame
      });

      cubeCamera1 = new THREE.CubeCamera(1, 1000, cubeRenderTarget1);

      cubeRenderTarget2 = new THREE.WebGLCubeRenderTarget(256, {
        format: THREE.RGBFormat,
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter,
        encoding: THREE.sRGBEncoding,
      });

      cubeCamera2 = new THREE.CubeCamera(1, 1000, cubeRenderTarget2);

      material = new THREE.MeshBasicMaterial({
        //envMap: cubeRenderTarget2.texture,
        //combine: THREE.MultiplyOperation,
        //reflectivity: 20,
      });

      //   const s_texture = new THREE.TextureLoader().load(wall);
      //   const s_material = new THREE.MeshPhongMaterial({
      //     map: s_texture,
      //     opacity: 0.3,
      //     transparent: true,
      //   });
      //   let plane = new THREE.Mesh(new THREE.PlaneGeometry(50, 50, 50), material);
      //   scene.add(plane);

      //   cube = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), material);
      //   scene.add(cube);

      material = new THREE.MeshBasicMaterial({
        //map: texture,
        color: 0xffffff,
        opacity: 0.1,
        transparent: true,
      });
      cube = new THREE.Mesh(new THREE.PlaneGeometry(70, 100, 60), material);

      //scene.add(cube);

      //draw
      const boxWidth = 750;
      const boxHeight = 1200;
      const boxDepth = 10;
      const geometry = new THREE.PlaneGeometry(boxWidth, boxHeight, boxDepth);
      const draws = []; // just an array we can use to rotate the cubes
      const loader = new THREE.TextureLoader();
      loader.load(wall2, (texture) => {
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          opacity: 0.7,
          transparent: true,
        });
        const draw = new THREE.Mesh(geometry, material);
        draw.position.set(10, 3, -900);

        scene.add(draw);
        draws.push(draw); // add to our list of cubes to rotate
      });

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
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
          window.location.href = 'sell_your_mind_research#/d15';
      };
      const onKeyDown = function (event) {
        if (event.code === 'KeyF')
          window.location.href = 'sell_your_mind_research#/d15';
      };
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keypress', onKeyPress);
      document.addEventListener('pointerdown', onPointerDown);
      document.addEventListener('wheel', onDocumentMouseWheel);
      document.body.style.cursor = 'none';

      window.addEventListener('resize', onWindowResized);
    }

    function onWindowResized() {
      renderer.setSize(window.innerWidth, window.innerHeight);

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }

    function onPointerDown(event) {
      event.preventDefault();

      onPointerDownPointerX = event.clientX;
      onPointerDownPointerY = event.clientY;

      onPointerDownLon = lon;
      onPointerDownLat = lat;

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    }

    function onPointerMove(event) {
      lon = (event.clientX - onPointerDownPointerX) * 0.1 + onPointerDownLon;
      lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
    }

    function onPointerUp() {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    }

    function onDocumentMouseWheel(event) {
      const fov = camera.fov + event.deltaY * 0.05;

      camera.fov = THREE.MathUtils.clamp(fov, 10, 75);

      camera.updateProjectionMatrix();
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      const time = Date.now();

      lon += 0.055;

      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      cube.position.x = Math.cos(time * 0.001) * 30;
      cube.position.y = Math.sin(time * 0.001) * 30;
      cube.position.z = Math.sin(time * 0.001) * 30;

      cube.rotation.x += 0.02;
      cube.rotation.y += 0.03;

      //   torus.position.x = Math.cos(time * 0.001 + 10) * 30;
      //   torus.position.y = Math.sin(time * 0.001 + 10) * 30;
      //   torus.position.z = Math.sin(time * 0.001 + 10) * 30;
      //   torus.rotation.x += 0.02;
      //   torus.rotation.y += 0.03;

      camera.position.x = 500 * Math.sin(phi) * Math.cos(theta);
      camera.position.y = 500 * Math.cos(phi);
      camera.position.z = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(scene.position);

      // pingpong
      if (count % 2 === 0) {
        cubeCamera1.update(renderer, scene);
        material.envMap = cubeRenderTarget1.texture;
      } else {
        cubeCamera2.update(renderer, scene);
        material.envMap = cubeRenderTarget2.texture;
      }

      count++;

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
          <img src={l2} alt="letter" />
        </div>
      </div>
    </div>
  );
};
export default Detail_2;
