AFRAME.registerComponent("bowling", {
init: function(){
    this.bowl()
    this.remove()
},
bowl: function(){
    window.addEventListener("keydown",(e)=>{
        if(e.key === "y"){
            var bowl = document.createElement("a-entity")
            bowl.setAttribute("geometry",{
                primitive: "sphere", radius: 0.1
            })
            bowl.setAttribute("material",{
                color: "black"
            })
            var camera = document.querySelector("#camera")
            pos = camera.getAttribute("position")
            bowl.setAttribute("position", {
                x: pos.x, y: pos.y, z: pos.z
            })
            var camera2 = document.querySelector("#camera").object3D
            var direction = new THREE.Vector3()
            camera2.getWorldDirection(direction)
            bowl.setAttribute("velocity", direction.multiplyScalar(-10))

            var scene = document.querySelector("#scene")
            scene.appendChild(bowl)
        }
    })
},

remove: function(e){
        var element = e.detail.target.el
        var elementHit = e.detail.body.el
        if(elementHit.id.includes("pin")){

            var impulse = new CANNON.Vec3(-2,2,1)
            var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute("position"))
            elementHit.body.applyForce(impulse,worldPoint);
            element.removeEventListener("collide", this.remove);
            var scene = document.querySelector("#scene")
            scene.removeChild(element)
        }


}
})