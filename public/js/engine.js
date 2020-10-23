var w = window.innerWidth
var h = window.innerHeight
var renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.setSize(w, h)
document.body.appendChild(renderer.domElement)

var cubes = []
function makeCube() {
  var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
  var material = new THREE.MeshStandardMaterial()
  var mesh = new THREE.Mesh(geometry, material)
  cubes.push(mesh)
  return mesh
}
function setCubeColor(i, color) {
  cubes[i].material.color = new THREE.Color(color)
}

var scene = new THREE.Scene()
var skylight = new THREE.HemisphereLight("#ffffff", 1)
scene.add(skylight)
var firstCube = makeCube()
scene.add(firstCube)
// scene.background = new THREE.Color(255, 0, 100)

var camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 100)
camera.position.z = 2

requestAnimationFrame(animate)

function animate() {
  requestAnimationFrame(animate)

  for (var c of cubes) {
    c.rotation.x += 0.01
    c.rotation.y += 0.02
  }

  renderer.render(scene, camera)
}