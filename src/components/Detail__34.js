import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import img from '../material/texture/24.jpeg';
import l34 from '../material/letter34.jpeg';
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js';
import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper.js';
import '../stylesheet/detail.scss';

const Detail__34 = () => {
  let [letter, letterSet] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => {
      letterSet(false);
    }, 4000);
    let timer2 = setTimeout(() => {
      window.location.href = 'sell_your_mind_research#/d18';
    }, 90000);

    let container,
      flag = 0;
    let camera, scene, renderer;

    init();
    animate();

    function init() {
      container = document.createElement('div');
      container.id = 'div';
      document.body.appendChild(container);
      document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
      });

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

      // const blocker = document.getElementById('blocker');
      // const instructions = document.getElementById('instructions');
      // instructions.style.display = 'none';
      // blocker.style.display = 'none';
      // const onKeyPress = function (event) {
      //   if (event.code === 'KeyG' && !flag) {
      //     blocker.style.display = 'block';
      //     instructions.style.display = '';
      //     flag = 1;
      //   } else if (event.code === 'KeyG' && flag) {
      //     blocker.style.display = 'none';
      //     instructions.style.display = 'none';
      //     flag = 0;
      //   } else if (event.code === 'KeyF') {
      //     window.location.href = 'sell_your_mind_research#/d18';
      //   }
      // };

      // document.addEventListener('keypress', onKeyPress);

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
      // stats.update();
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
    document.body.style.cursor = 'none';
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
    console.log(render.domElement);
    return () => {
      var toerase = document.getElementById('div');
      toerase.remove();
    };
  }, []);
  return (
    <div className="detail-body" id="container">
      {letter === true ? (
        <div className="blocker" id="blocker">
          <div className="instructions" id="instructions">
            <img src={l34} alt="letter" />
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Detail__34;
