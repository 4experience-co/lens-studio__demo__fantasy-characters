// -----JS CODE-----
// @input SceneObject[] ogreObjects;
// @input SceneObject[] knightObjects;
// @input SceneObject[] princessObjects;

var currentCharacter = 0;
var i = 0;

function setActivateOgre(value) {
    for (i = 0; i < script.ogreObjects.length; i++) {
        script.ogreObjects[i].enabled = value;
    }
}

function setActivateKnight(value) {
    for (i = 0; i < script.knightObjects.length; i++) {
        script.knightObjects[i].enabled = value;
    }
}

function setActivatePrincess(value) {
    for (i = 0; i < script.princessObjects.length; i++) {
        script.princessObjects[i].enabled = value;
    }
}

var activateCharacter = function(characterIndex) {
    switch (characterIndex) {
        case 0:
            setActivateOgre(true);
            setActivateKnight(false);
            setActivatePrincess(false);
            break;
        
        case 1:
            setActivateOgre(false);
            setActivateKnight(true);
            setActivatePrincess(false);
            break;
        
        case 2:
            setActivateOgre(false);
            setActivateKnight(false);
            setActivatePrincess(true);
            break;
    }
    
    currentCharacter = characterIndex;
};

script.api.activateCharacter = function(characterIndex) {
    if (currentCharacter === characterIndex) {
        return;
    }
    
    activateCharacter(characterIndex);
};


script.api.activateCurrectCharacter = function() {
    activateCharacter(currentCharacter);
}

script.api.deactivateAllCharacters = function() {
    setActivateOgre(false);
    setActivateKnight(false);
    setActivatePrincess(false);
}