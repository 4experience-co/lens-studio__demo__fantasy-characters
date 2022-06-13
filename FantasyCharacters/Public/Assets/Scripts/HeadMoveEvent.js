// -----JS CODE-----
// @input SceneObject headBindingObject
// @input SceneObject tweens
            
var headTransform = script.headBindingObject.getTransform();

var samples = [];
var maxSamples = 10;
var threshold = -0.5;
var i = 0;
var diff = 0;


var isHelmetOpen = false;
var isAnimating = false;
var prev = 0;
var prevForward = headTransform.forward;
var animationTime = 0;

function onUpdate(eventData)
{
    var headForward = headTransform.forward;
    var current = new vec3(headTransform.forward.x, 0.0, headTransform.forward.z)
    var dot = current.dot(headForward);


    if (isAnimating)
    {
        animationTime += getDeltaTime();
        
        if (animationTime > 0.25) {
            isAnimating = false;
            animationTime = 0;
        }
    } else {
        if (prev - dot > 0.05) {
            isAnimating = true;
            
            if (isHelmetOpen) {
                closeHelmet();
                isHelmetOpen = false;
            } else {
                openHelmet();
                isHelmetOpen = true;
            }
        }
    }
    
    prev = dot;
    prevForward = headForward;
}

function openHelmet()
{
    global.tweenManager.startTween(script.tweens, "open_helmet");
}

function closeHelmet()
{
    global.tweenManager.startTween(script.tweens, "close_helmet");
}

script.createEvent("UpdateEvent").bind(onUpdate);
