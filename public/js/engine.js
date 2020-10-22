var w = window.innerWidth
var h = window.innerHeight
var renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.setSize(w, h)
document.body.appendChild(renderer.domElement)

var cubes = []
function makeCube() {
  var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
  var material = new THREE.MeshNormalMaterial()
  var mesh = new THREE.Mesh(geometry, material)
  cubes.push(mesh)
  return mesh
}

var scene = new THREE.Scene()
var firstCube = makeCube()
scene.add(firstCube)

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