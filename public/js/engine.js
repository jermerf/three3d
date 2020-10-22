var w = window.innerWidth
var h = window.innerHeight
var renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.setSize(w, h)
document.body.appendChild(renderer.domElement)

var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshNormalMaterial()
var mesh = new THREE.Mesh(geometry, material)

var scene = new THREE.Scene()
scene.add(mesh)

var camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 100)
camera.position.z = 2

requestAnimationFrame(animate)

function animate() {
  requestAnimationFrame(animate)
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.02
  renderer.render(scene, camera)
}