import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import img from '../material/texture/12.jpg';
import l18 from '../material/letter18.jpeg';
import '../stylesheet/detail__18.scss';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

const Detail__18 = () => {
  let [letter, letterSet] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => {
      letterSet(false);
      controls.lock();
    }, 4000);
    let timer2 = setTimeout(() => {
      window.location.href = 'sell_your_mind_research#/d23';
    }, 90000);
    let camera,
      scene,
      renderer,
      controls,
      flag = 0;

    const objects = [];

    let raycaster;

    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    let canJump = false;

    let prevTime = performance.now();
    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const vertex = new THREE.Vector3();
    const color = new THREE.Color();
    const texture = new THREE.TextureLoader().load(img);

    init();
    animate();

    function init() {
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.y = 10;

      scene = new THREE.Scene();

      scene.fog = new THREE.Fog(0xffffff, 0, 750);
      scene.background = new THREE.TextureLoader().load(img);

      const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
      light.position.set(0.5, 1, 0.75);
      scene.add(light);

      controls = new PointerLockControls(camera, document.body);

      const b = document.getElementById('b');
      const i = document.getElementById('i');

      i.addEventListener('click', function () {
        controls.lock();
      });

      controls.addEventListener('lock', function () {
        i.style.display = 'none';
        b.style.display = 'none';
      });

      controls.addEventListener('unlock', function () {
        i.style.display = 'none';
        b.style.display = 'none';
      });

      scene.add(controls.getObject());

      const onKeyDown = function (event) {
        switch (event.code) {
          case 'ArrowUp':
          case 'KeyW':
            moveForward = true;
            break;

          case 'ArrowLeft':
          case 'KeyA':
            moveLeft = true;
            break;

          case 'ArrowDown':
          case 'KeyS':
            moveBackward = true;
            break;

          case 'ArrowRight':
          case 'KeyD':
            moveRight = true;
            break;

          case 'Space':
            if (canJump === true) velocity.y += 350;
            canJump = false;
            break;
          case 'KeyF':
            window.location.href = 'sell_your_mind_research#/d23';
            break;
        }
      };

      const onKeyUp = function (event) {
        switch (event.code) {
          case 'ArrowUp':
          case 'KeyW':
            moveForward = false;
            break;

          case 'ArrowLeft':
          case 'KeyA':
            moveLeft = false;
            break;

          case 'ArrowDown':
          case 'KeyS':
            moveBackward = false;
            break;

          case 'ArrowRight':
          case 'KeyD':
            moveRight = false;
            break;
          case 'KeyF':
            window.location.href = 'sell_your_mind_research#/d23';
            break;
        }
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
        }
      };
      document.addEventListener('keypress', onKeyPress);
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keyup', onKeyUp);

      raycaster = new THREE.Raycaster(
        new THREE.Vector3(),
        new THREE.Vector3(0, -1, 0),
        0,
        10
      );

      // floor

      let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
      floorGeometry.rotateX(-Math.PI / 2);

      // vertex displacement

      let position = floorGeometry.attributes.position;

      for (let i = 0, l = position.count; i < l; i++) {
        vertex.fromBufferAttribute(position, i);

        vertex.x += Math.random() * 20 - 10;
        vertex.y += Math.random() * 2;
        vertex.z += Math.random() * 20 - 10;

        position.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }

      floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

      position = floorGeometry.attributes.position;
      const colorsFloor = [];

      for (let i = 0, l = position.count; i < l; i++) {
        color.setHSL(
          Math.random() * 0.3 + 0.5,
          0.75,
          Math.random() * 0.25 + 0.75
        );
        colorsFloor.push(color.r, color.g, color.b);
      }

      floorGeometry.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(colorsFloor, 3)
      );
      const floorMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });

      const floor = new THREE.Mesh(floorGeometry, floorMaterial);

      scene.add(floor);

      // objects

      const boxGeometry = new THREE.BoxGeometry(20, 20, 20).toNonIndexed();

      position = boxGeometry.attributes.position;
      const colorsBox = [];

      for (let i = 0, l = position.count; i < l; i++) {
        color.setHSL(
          Math.random() * 0.3 + 0.5,
          0.75,
          Math.random() * 0.25 + 0.75
        );
        colorsBox.push(color.r, color.g, color.b);
      }

      boxGeometry.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(colorsBox, 3)
      );

      for (let i = 0; i < 500; i++) {
        const boxMaterial = new THREE.MeshPhongMaterial({
          map: texture,
          specular: 0xffffff,
          flatShading: true,
          vertexColors: true,
        });
        boxMaterial.color.setHSL(
          Math.random() * 0.2 + 0.5,
          0.75,
          Math.random() * 0.25 + 0.75
        );

        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.position.x = Math.floor(Math.random() * 20 - 10) * 20;
        box.position.y = Math.floor(Math.random() * 20) * 20 + 10;
        box.position.z = Math.floor(Math.random() * 20 - 10) * 20;

        scene.add(box);
        objects.push(box);
      }

      //

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

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

      const time = performance.now();

      if (controls.isLocked === true) {
        raycaster.ray.origin.copy(controls.getObject().position);
        raycaster.ray.origin.y -= 10;
        const intersections = raycaster.intersectObjects(objects);
        const onObject = intersections.length > 0;
        const delta = (time - prevTime) / 1000;
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize(); // this ensures consistent movements in all directions

        if (moveForward || moveBackward)
          velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

        if (onObject === true) {
          velocity.y = Math.max(0, velocity.y);
          canJump = true;
        }

        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);

        controls.getObject().position.y += velocity.y * delta; // new behavior

        if (controls.getObject().position.y < 10) {
          velocity.y = 0;
          controls.getObject().position.y = 10;

          canJump = true;
        }
      }

      prevTime = time;

      renderer.render(scene, camera);
    }
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div>
      {letter === true ? (
        <div className="blocker" id="blocker">
          <div className="instructions" id="instructions">
            <img src={l18} alt="letter" />
          </div>
        </div>
      ) : null}
      <div className="b" id="b">
        <div className="i" id="i">
          {/* <div className="blocker" id="blocker">
            <div className="instructions" id="instructions">
              <img src={l18} alt="letter" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Detail__18;
