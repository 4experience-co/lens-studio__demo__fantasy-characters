// BindTransform.js
// Version: 0.2.0
// Event: Lens Initialized
// Description: Bind one object's transform to the object this script is on (position, rotation, scale)
// @input SceneObject sourceObject

// @input bool bindPosition
// @input bool bindRotation
// @input bool bindScale

if (!script.sourceObject) {
    print("ERROR: Source object to copy transform from is not set");
    return;
}
var sceneObject = script.getSceneObject();
var transform = sceneObject.getTransform();

var bindedTransform = script.sourceObject.getTransform();

var initPosition = transform.getLocalPosition();
var initRotation = transform.getLocalRotation();
var initScale = transform.getLocalScale();

var isInitialized = false;

for (var i = 0; i < script.getSceneObject().getChildrenCount(); i++) {
    script.getSceneObject().getChild(i).enabled = false;
}

script.createEvent("UpdateEvent").bind(onUpdate);

function onUpdate() {
    if (!isInitialized) {
        for (var i = 0; i < script.getSceneObject().getChildrenCount(); i++) {
            script.getSceneObject().getChild(i).enabled = true;
        }
        isInitialized = true;
    }  
    applyTransform();
}
function applyTransform() {
  
    if (script.bindScale) {
        var scale = bindedTransform.getWorldScale();
        transform.setWorldScale(scale.mult(initScale));
    }    
    if (script.bindRotation) {
        var rotation = bindedTransform.getWorldRotation();
        transform.setWorldRotation(rotation.multiply(initRotation));
    }    
    if (script.bindPosition) {
        var position = bindedTransform.getWorldPosition();
        transform.setWorldPosition(position.add(initPosition));  
    }
}