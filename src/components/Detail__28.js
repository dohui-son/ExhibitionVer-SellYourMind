import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { Scene } from 'three';
import img from '../material/texture/19.jpg';
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

import {
  VOXLoader,
  VOXDataTexture3D,
} from 'three/examples/jsm/loaders/VOXLoader.js';

import { WEBGL } from 'three/examples/jsm/WebGL.js';
import l28 from '../material/letter28.png';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

//import { ImprovedNoise } from './jsm/math/ImprovedNoise.js';
const Detail__28 = () => {
  useEffect(() => {
    if (WEBGL.isWebGL2Available() === false) {
      document.body.appendChild(WEBGL.getWebGL2ErrorMessage());
    }

    const INITIAL_CLOUD_SIZE = 128;

    let renderer,
      scene,
      camera,
      flag = 0;
    let mesh;
    let prevTime = performance.now();
    let cloudTexture = null;
    const texture_img = new THREE.TextureLoader().load(img);

    //background
    let sphere, clock;

    init();
    animate();

    function generateCloudTexture(size, scaleFactor = 1.0) {
      const data = new Uint8Array(size * size * size);
      const scale = (scaleFactor * 10.0) / size;

      let i = 0;
      const perlin = new ImprovedNoise();
      const vector = new THREE.Vector3();

      for (let z = 0; z < size; z++) {
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            const dist = vector
              .set(x, y, z)
              .subScalar(size / 2)
              .divideScalar(size)
              .length();
            const fadingFactor = (1.0 - dist) * (1.0 - dist);
            data[i] =
              (128 +
                128 *
                perlin.noise(
                  (x * scale) / 1.5,
                  y * scale,
                  (z * scale) / 1.5
                )) *
              fadingFactor;

            i++;
          }
        }
      }

      return new THREE.DataTexture3D(data, size, size, size);
    }

    function init() {
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.9,
        100
      );
      camera.position.set(0, 0, 1.5);

      new OrbitControls(camera, renderer.domElement);

      scene.fog = new THREE.Fog(0xffffff, 0, 750);
      // Sky

      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 32;

      const context = canvas.getContext('2d');
      const gradient = context.createLinearGradient(0, 0, 0, 32);
      gradient.addColorStop(0.0, '#014a84');
      gradient.addColorStop(0.5, '#0561a0');
      gradient.addColorStop(1.0, '#437ab6');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 1, 32);

      //background
      const container = document.getElementById('container');
      clock = new THREE.Clock();
      scene.background = new THREE.Color(0x101010);
      const light = new THREE.AmbientLight(0xffffff, 1);
      scene.add(light);
      // Create the panoramic sphere geometery
      const panoSphereGeo = new THREE.SphereGeometry(6, 256, 256);

      // Create the panoramic sphere material
      const panoSphereMat = new THREE.MeshStandardMaterial({
        side: THREE.BackSide,
        displacementScale: -4.0,
      });

      // Create the panoramic sphere mesh
      sphere = new THREE.Mesh(panoSphereGeo, panoSphereMat);

      // Load and assign the texture and depth map
      const manager = new THREE.LoadingManager();
      const loader = new THREE.TextureLoader(manager);

      loader.load(img, function (texture) {
        texture.minFilter = THREE.NearestFilter;
        texture.generateMipmaps = false;
        sphere.material.map = texture;
      });

      loader.load(img, function (depth) {
        depth.minFilter = THREE.NearestFilter;
        depth.generateMipmaps = false;
        sphere.material.displacementMap = depth;
      });

      // On load complete add the panoramic sphere to the scene
      manager.onLoad = function () {
        scene.add(sphere);
      };
      ///////////////////////////////////////////

      const sky = new THREE.Mesh(
        new THREE.SphereGeometry(10),
        //new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas), side: THREE.BackSide })
        new THREE.MeshBasicMaterial({ map: texture_img, side: THREE.BackSide })
      );
      //scene.background = new THREE.TextureLoader().load(img);
      //scene.add(sky);

      // Texture

      const texture = new THREE.DataTexture3D(
        new Uint8Array(
          INITIAL_CLOUD_SIZE * INITIAL_CLOUD_SIZE * INITIAL_CLOUD_SIZE
        ).fill(0),
        INITIAL_CLOUD_SIZE,
        INITIAL_CLOUD_SIZE,
        INITIAL_CLOUD_SIZE
      );
      texture.format = THREE.RedFormat;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.unpackAlignment = 1;

      cloudTexture = texture_img;

      // Material

      const vertexShader = /* glsl */ `
        in vec3 position;
        uniform mat4 modelMatrix;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform vec3 cameraPos;
        out vec3 vOrigin;
        out vec3 vDirection;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          vOrigin = vec3( inverse( modelMatrix ) * vec4( cameraPos, 1.0 ) ).xyz;
          vDirection = position - vOrigin;
          gl_Position = projectionMatrix * mvPosition;
        }
      `;

      const fragmentShader = /* glsl */ `
        precision highp float;
        precision highp sampler3D;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        in vec3 vOrigin;
        in vec3 vDirection;
        out vec4 color;
        uniform vec3 base;
        uniform sampler3D map;
        uniform float threshold;
        uniform float range;
        uniform float opacity;
        uniform float steps;
        uniform float frame;
        uint wang_hash(uint seed)
        {
            seed = (seed ^ 61u) ^ (seed >> 16u);
            seed *= 9u;
            seed = seed ^ (seed >> 4u);
            seed *= 0x27d4eb2du;
            seed = seed ^ (seed >> 15u);
            return seed;
        }
        float randomFloat(inout uint seed)
        {
            return float(wang_hash(seed)) / 4294967296.;
        }
        vec2 hitBox( vec3 orig, vec3 dir ) {
          const vec3 box_min = vec3( - 0.5 );
          const vec3 box_max = vec3( 0.5 );
          vec3 inv_dir = 1.0 / dir;
          vec3 tmin_tmp = ( box_min - orig ) * inv_dir;
          vec3 tmax_tmp = ( box_max - orig ) * inv_dir;
          vec3 tmin = min( tmin_tmp, tmax_tmp );
          vec3 tmax = max( tmin_tmp, tmax_tmp );
          float t0 = max( tmin.x, max( tmin.y, tmin.z ) );
          float t1 = min( tmax.x, min( tmax.y, tmax.z ) );
          return vec2( t0, t1 );
        }
        float sample1( vec3 p ) {
          return texture( map, p ).r;
        }
        float shading( vec3 coord ) {
          float step = 0.01;
          return sample1( coord + vec3( - step ) ) - sample1( coord + vec3( step ) );
        }
        void main(){
          vec3 rayDir = normalize( vDirection );
          vec2 bounds = hitBox( vOrigin, rayDir );
          if ( bounds.x > bounds.y ) discard;
          bounds.x = max( bounds.x, 0.0 );
          vec3 p = vOrigin + bounds.x * rayDir;
          vec3 inc = 1.0 / abs( rayDir );
          float delta = min( inc.x, min( inc.y, inc.z ) );
          delta /= steps;
          // Jitter
          // Nice little seed from
          // https://blog.demofox.org/2020/05/25/casual-shadertoy-path-tracing-1-basic-camera-diffuse-emissive/
          uint seed = uint( gl_FragCoord.x ) * uint( 1973 ) + uint( gl_FragCoord.y ) * uint( 9277 ) + uint( frame ) * uint( 26699 );
          vec3 size = vec3( textureSize( map, 0 ) );
          float randNum = randomFloat( seed ) * 2.0 - 1.0;
          p += rayDir * randNum * ( 1.0 / size );
          //
          vec4 ac = vec4( base, 0.0 );
          for ( float t = bounds.x; t < bounds.y; t += delta ) {
            float d = sample1( p + 0.5 );
            d = smoothstep( threshold - range, threshold + range, d ) * opacity;
            float col = shading( p + 0.5 ) * 3.0 + ( ( p.x + p.y ) * 0.25 ) + 0.2;
            ac.rgb += ( 1.0 - ac.a ) * d * col;
            ac.a += ( 1.0 - ac.a ) * d;
            if ( ac.a >= 0.95 ) break;
            p += rayDir * delta;
          }
          color = ac;
          if ( color.a == 0.0 ) discard;
        }
      `;

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.RawShaderMaterial({
        glslVersion: THREE.GLSL3,
        uniforms: {
          base: { value: new THREE.Color(0x798aa0) },
          map: { value: texture },
          cameraPos: { value: new THREE.Vector3() },
          threshold: { value: 0.25 },
          opacity: { value: 0.25 },
          range: { value: 0.1 },
          steps: { value: 100 },
          frame: { value: 0 },
        },
        vertexShader,
        fragmentShader,
        side: THREE.BackSide,
        transparent: true,
      });

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      //

      const parameters = {
        threshold: 0.25,
        opacity: 0.25,
        range: 0.1,
        steps: 100,
      };

      function update() {
        material.uniforms.threshold.value = parameters.threshold;
        material.uniforms.opacity.value = parameters.opacity;
        material.uniforms.range.value = parameters.range;
        material.uniforms.steps.value = parameters.steps;
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
          window.location.href = 'sell_your_mind_research#/d43';
      };
      const onKeyDown = function (event) {
        if (event.code === 'KeyF')
          window.location.href = 'sell_your_mind_research#/d43';
      };
      document.body.style.cursor = 'none';
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keypress', onKeyPress);
      window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    let curr = 0;
    const countPerRow = 4;
    const countPerSlice = countPerRow * countPerRow;
    const sliceCount = 4;
    const totalCount = sliceCount * countPerSlice;
    const margins = 8;

    const perElementPaddedSize = (INITIAL_CLOUD_SIZE - margins) / countPerRow;
    const perElementSize = Math.floor((INITIAL_CLOUD_SIZE - 1) / countPerRow);

    function animate() {
      requestAnimationFrame(animate);

      const time = performance.now();
      if (time - prevTime > 1500.0 && curr < totalCount) {
        const position = new THREE.Vector3(
          Math.floor(curr % countPerRow) * perElementSize + margins * 0.5,
          Math.floor((curr % countPerSlice) / countPerRow) * perElementSize +
          margins * 0.5,
          Math.floor(curr / countPerSlice) * perElementSize + margins * 0.5
        ).floor();

        const maxDimension = perElementPaddedSize - 1;
        const box = new THREE.Box3(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(maxDimension, maxDimension, maxDimension)
        );
        const scaleFactor = (Math.random() + 0.5) * 0.5;
        const source = generateCloudTexture(perElementPaddedSize, scaleFactor);

        renderer.copyTextureToTexture3D(box, position, source, cloudTexture);

        prevTime = time;

        curr++;
      }

      mesh.material.uniforms.cameraPos.value.copy(camera.position);
      // mesh.rotation.y = - performance.now() / 7500;

      mesh.material.uniforms.frame.value++;

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
          <img src={l28} alt="letter" />
        </div>
      </div>
    </div>
  );
};
export default Detail__28;
