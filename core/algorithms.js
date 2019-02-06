const methods = new Map();
methods.set('round',(x, y, z, input) => {
    let {direction, radius} = input;
    let session = [];
    switch (direction) {
        case "x":
            for (let i = -radius; i <= radius; i++) {
                for (let j = -radius; j <= radius; j++) {
                    if (i * i + j * j < radius * radius) {
                        session.push([x, y + i, z + j]);
                    }
                }
            }
            break;
        case "y":
            for (let i = -radius; i <= radius; i++) {
                for (let j = -radius; j <= radius; j++) {
                    if (i * i + j * j < radius * radius) {
                        session.push([x + i, y, z + j]);
                    }
                }
            }
            break;
        case "z":
            for (let i = -radius; i <= radius; i++) {
                for (let j = -radius; j <= radius; j++) {
                    if (i * i + j * j < radius * radius) {
                        session.push([x + i, y + j, z]);
                    }
                }
            }
            break;
        default:
            break;
    }
    return session;
});
methods.set('circle',(x, y, z, input) => {
    let {direction, radius} = input;
    let session = [];
    switch (direction) {
        case "x":
            for (let i = -radius; i <= radius; i++) {
                for (let j = -radius; j <= radius; j++) {
                    if (i * i + j * j < radius * radius && i * i + j * j >= (radius - 1) * (radius - 1)) {
                        session.push([x, y + i, z + j]);
                    }
                }
            }
            break;
        case "y":
            for (let i = -radius; i <= radius; i++) {
                for (let j = -radius; j <= radius; j++) {
                    if (i * i + j * j < radius * radius && i * i + j * j >= (radius - 1) * (radius - 1)) {
                        session.push([x + i, y, z + j]);
                    }
                }
            }
            break;
        case "z":
            for (let i = -radius; i <= radius; i++) {
                for (let j = -radius; j <= radius; j++) {
                    if (i * i + j * j < radius * radius && i * i + j * j >= (radius - 1) * (radius - 1)) {
                        session.push([x + i, y + j, z]);
                    }
                }
            }
            break;
        default:
            break;
    }
    return session;
});
methods.set('sphere',(x, y, z, input) => {
    let {shape, radius} = input;
    let session = [];
    switch (shape) {
        case "hollow":
            for (let i = -radius; i <= radius; i++) {
                for (let j = -radius; j <= radius; j++) {
                    for (let k = -radius; k <= radius; k++) {
                        if (i * i + j * j + k * k <= radius * radius && i * i + j * j + k * k >= (radius - 1) * (radius - 1)) {
                            session.push([x + i, y + j, z + k]);
                        }
                    }
                }
            }
            break;
        case "solid":
            for (let i = -radius; i <= radius; i++) {
                for (let j = -radius; j <= radius; j++) {
                    for (let k = -radius; k <= radius; k++) {
                        if (i * i + j * j + k * k <= radius * radius) {
                            session.push([x + i, y + j, z + k]);
                        }
                    }
                }
            }
            break;
        default:
            break;
    }
    return session;
});
methods.set('ellipse',(x, y, z, input) => {
    let {direction, length, width} = input;
    let session = [];
    switch (direction) {
        case "x":
            for (let i = -length; i <= length; i++) {
                for (let j = -width; j <= width; j++) {
                    if ((i * i) / (length * length) + (j * j) / (width * width) < 1) {
                        session.push([x, y + i, j + z]);
                    }
                }
            }
            break;
        case "y":
            for (let i = -length; i <= length; i++) {
                for (let j = -width; j <= width; j++) {
                    if ((i * i) / (length * length) + (j * j) / (width * width) < 1) {
                        session.push([x + i, y, j + z]);
                    }
                }
            }
            break;
        case "z":
            for (let i = -length; i <= length; i++) {
                for (let j = -width; j <= width; j++) {
                    if ((i * i) / (length * length) + (j * j) / (width * width) < 1) {
                        session.push([x + i, y + z, j]);
                    }
                }
            }
            break;
        default:
            break;
    }
    return session;
});
methods.set('ellipsoid',(x, y, z, input) => {
    let {length, height, width} = input;
    let session = [];
    for (let i = -length; i <= length; i++) {
        for (let j = -width; j <= width; j++) {
            for (let k = -height; k <= height; k++) {
                if ((i * i) / (length * length) + (j * j) / (width * width) + (k * k) / (height * height) <= 1) {
                    session.push([x + i, y + j, z + k]);
                }
            }
        }
    }
    return session;
});
methods.set('torus',(x, y, z, input) => {
    let {accuracy, radius, length} = input;
    let session = [];
    accuracy = 1 / accuracy;
    let max = Math.PI * 2;
    switch (direction) {
        case "x":
            for (let v = 0; v < max; v = v + accuracy) {
                for (let u = 0; u < max; u = u + accuracy) {
                    session.push([Math.round(Math.cos(u) * (length * Math.cos(v) + radius)) + x, Math.round(Math.sin(u) * (length * Math.cos(v) + radius)) + y, Math.round(length * Math.sin(v)) + z]);
                }
            }
            break;

        case "y":
            for (let v = 0; v < max; v = v + accuracy) {
                for (let u = 0; u < max; u = u + accuracy) {
                    session.push([Math.round(Math.cos(u) * (length * Math.cos(v) + radius)) + x, Math.round(length * Math.sin(v)) + y, Math.round(Math.sin(u) * (length * Math.cos(v) + radius)) + z]);
                }
            }
            break;
        case "z":
            for (let v = 0; v < max; v = v + accuracy) {
                for (let u = 0; u < max; u = u + accuracy) {
                    session.push([Math.round(length * Math.sin(v)) + x, Math.round(Math.cos(u) * (length * Math.cos(v) + radius)) + y, Math.round(Math.sin(u) * (length * Math.cos(v) + radius)) + z]);
                }
            }
            break;
        default:
            break;
    }
    return multiDimensionalUnique(session);
});
methods.set('cone',(x, y, z, input) => {
    let {height, accuracy, radius} = input;
    let session = [];
    let max = Math.PI * 2;
    accuracy = 1 / accuracy;
    switch (direction) {
        case "z":
            for (let u = 0; u < height; u++) {
                for (let i = 0; i < max; i = i + accuracy) {
                    session.push([Math.floor(((height - u) / height) * radius * Math.cos(i)) + x, Math.floor(((height - u) / height) * radius * Math.sin(i)) + y, u + z]);
                }
            }
            break;
        case "y":
            for (let u = 0; u < height; u++) {
                for (let i = 0; i < max; i = i + accuracy) {
                    session.push([Math.floor(((height - u) / height) * radius * Math.cos(i)) + x, u + y, Math.floor(((height - u) / height) * radius * Math.sin(i)) + z]);
                }
            }
            break;
        case "x":
            for (let u = 0; u < height; u++) {
                for (let i = 0; i < max; i = i + accuracy) {
                    session.push([u + x, Math.floor(((height - u) / height) * radius * Math.cos(i)) + y, Math.floor(((height - u) / height) * radius * Math.sin(i)) + z]);
                }
            }
            break;
        default:
            break;
    }

    return multiDimensionalUnique(session);
});
methods.set('ellipticTorus',(x, y, z, input) => {
    let {radius, accuracy, length, width, direction} = input;
    let session = [];
    accuracy = 1 / accuracy;
    let max = Math.PI * 2;
    switch(direction) {
        case 'z':
            for(let v = 0 ; v < max ; v = v + accuracy){
                for(let u = 0 ; u < max ; u = u + accuracy){
                    session.push([x + Math.round((radius + (length * Math.cos(v))) * Math.cos(u)), y + Math.round((radius + (length * Math.cos(v))) * Math.sin(u)), z + Math.round(width * Math.sin(v))]);
                }
            }
            break;
        case 'y':
            for(let v = 0 ; v < max ; v = v + accuracy){
                for(let u = 0 ; u < max ; u = u + accuracy){
                    session.push([x + Math.round((radius + (length * Math.cos(v))) * Math.cos(u)), y + Math.round(width * Math.sin(v)), z + Math.round((radius + (length * Math.cos(v))) * Math.sin(u))]);
                }
            }
            break;
        case 'x':
            for(let v = 0 ; v < max ; v = v + accuracy){
                for(let u = 0 ; u < max ; u = u + accuracy){
                    session.push([x + Math.round(width * Math.sin(v)), y + Math.round((radius + (length * Math.cos(v))) * Math.sin(u)), z + Math.round((radius + (length * Math.cos(v))) * Math.cos(u))]);
                }
            }
            break;
        default:
            break;
    }
    return multiDimensionalUnique(session);
});
methods.set('ligature',(PosArray1, PosArray2) => {
    let session = new Array();
    let[i, j, k] = PosArray1;
    let[x2, y2, z2] = PosArray2;
    let line = Math.max(Math.abs(i - x2), Math.abs(j - y2), Math.abs(k - z2)) * 1;
    for (let i = 0; i <= line; i++) {
        session.push([Math.round(i + i / line * (x2 - i)), Math.round(j + i / line * (y2 - j)), Math.round(k + i / line * (z2 - k))]);
    }
    return session;
});
methods.set('pumpkins',(pX, pY, pZ, input) => {
    let {radius} = input;
    let session = [];
    function createPumpkins(x, y, z) {
        switch(Math.floor(Math.random() * 3) + 1) {
            case 1:
                session.push([x, y, z, 'pumpkin', 0]);
                session.push([x + 2, y, z, 'pumpkin', 0]);
                session.push([x - 2, y, z - 1, 'pumpkin', 0]);
                session.push([x + 3, y, z + 2, 'pumpkin', 0]);
                session.push([x - 2, y, z + 3, 'pumpkin', 0]);
                session.push([x, y, z - 3, 'pumpkin', 0]);
                session.push([x, y, z + 2, 'pumpkin', 0]);
                session.push([x + 1, y, z - 1, 'leaves', 0]);
                session.push([x - 2, y, z + 1, 'leaves', 0]);
                session.push([x + 1, y, z + 1, 'leaves', 0]);
                session.push([x, y, z - 2, 'leaves', 0]);
                break;

            case 2:
                session.push([x + 3, y, z, 'pumpkin', 0]);
                session.push([x + 2, y, z, 'pumpkin', 0]);
                session.push([x - 1, y, z - 1, 'pumpkin', 0]);
                session.push([x + 3, y, z + 2, 'pumpkin', 0]);
                session.push([x - 4, y, z + 2, 'pumpkin', 0]);
                session.push([x + 1, y, z - 2, 'pumpkin', 0]);
                session.push([x + 1, y, z - 3, 'leaves', 0]);
                session.push([x - 2, y, z + 1, 'leaves', 0]);
                session.push([x + 1, y, z + 1, 'leaves', 0]);
                session.push([x + 1, y, z - 2, 'leaves', 0]);
                break;

            case 3:
                session.push([x, y, z + 1, 'pumpkin', 0]);
                session.push([x + 2, y, z, 'pumpkin', 0]);
                session.push([x + 2, y, z - 1, 'pumpkin', 0]);
                session.push([x + 3, y, z + 4, 'pumpkin', 0]);
                session.push([x - 1, y, z + 3, 'pumpkin', 0]);
                session.push([x + 1, y, z - 2, 'pumpkin', 0]);
                session.push([x + 1, y, z - 1, 'leaves', 0]);
                session.push([x - 2, y, z + 1, 'leaves', 0]);
                session.push([x + 1, y, z, 'leaves', 0]);
                session.push([x, y, z - 3, 'leaves', 0]);
                break;
        };
    }
    for(let x = -radius; x <= radius; x++) {
        for(let y = -radius; y <= radius; y++) {
            for(let z = -radius; z <= radius; z++) {
                if(Math.floor(Math.random() * 200) + 1 == 1) {
                    createPumpkins(pX + x, pY + y, pZ + z);
                }
            }
        }
    }
    return session;
});
methods.set('forestgen',(pX, pY, pZ, input) => {
    let {radius, shape, density} = input;
    let session = [];
    function Birch(x, y, z) {
        let height = Math.floor(Math.random() * 4) + 2;
        for(let a = -2; a < 3; a++) {
            for(let b = 1; b < 3; b++) {
                for(let c = -2; c < 3; c++) {
                    session.push([x + a, y + b + height, z + c, 'leaves', 2]);
                }
            }
        }

        for(let d = 0; d <= height + 2; d++) {
            session.push([x, y + d + 1, z, 'log', 2]);
        }

        session.push([x + 1, y + height + 3, z, 'leaves', 2]);
        session.push([x - 1, y + height + 3, z, 'leaves', 2]);
        session.push([x, y + height + 3, z + 1, 'leaves', 2]);
        session.push([x, y + height + 3, z - 1, 'leaves', 2]);
        session.push([x, y + height + 4, z, 'leaves', 2]);
        session.push([x + 1, y + height + 4, z, 'leaves', 2]);
        session.push([x - 1, y + height + 4, z, 'leaves', 2]);
        session.push([x, y + height + 4, z + 1, 'leaves', 2]);
        session.push([x, y + height + 4, z - 1, 'leaves', 2]);
    };
    function Oak(x, y, z) {
        let height = Math.floor(Math.random() * 3) + 1;
        for(let a = -2; a < 3; a++) {
            for(let b = 1; b < 3; b++) {
                for(let c = -2; c < 3; c++) {
                    session.push([x + a, y + b + height, z + c, 'leaves', 0]);
                }
            }
        }

        for(let d = 0; d <= height + 2; d++) {
            session.push([x, y + d + 1, z, 'log', 0]);
        }

        session.push([x + 1, y + height + 3, z, 'leaves', 0]);
        session.push([x - 1, y + height + 3, z, 'leaves', 0]);
        session.push([x, y + height + 3, z + 1, 'leaves', 0]);
        session.push([x, y + height + 3, z - 1, 'leaves', 0]);
        session.push([x, y + height + 4, z, 'leaves', 0]);
        session.push([x + 1, y + height + 4, z, 'leaves', 0]);
        session.push([x - 1, y + height + 4, z, 'leaves', 0]);
        session.push([x, y + height + 4, z + 1, 'leaves', 0]);
        session.push([x, y + height + 4, z - 1, 'leaves', 0]);
    };
    function Spruce(x, y, z) {
        let height = 4;
        for(let a = -2; a < 3; a++) {
            for(let b = 0; b < 1; b++) {
                for(let c = -2; c < 3; c++) {
                    session.push([x + a, y + b + height + 1, z + c, 'leaves', 1]);
                    session.push([x + 2, y + b + height + 1, z + 2, 'air', 0]);
                    session.push([x - 2, y + b + height + 1, z - 2, 'air', 0]);
                    session.push([x + 2, y + b + height + 1, z - 2, 'air', 0]);
                    session.push([x - 2, y + b + height + 1, z + 2, 'air', 0]);
                }
            }
        }

        for(let a = -2; a < 3; a++) {
            for(let b = 'air'; b < 1; b++) {
                for(let c = -2; c < 3; c++) {
                    session.push([x + a, y + b + height - 1, z + c, 'leaves', 1]);
                    session.push([x + 2, y + b + height - 1, z + 2, 'air', 0]);
                    session.push([x - 2, y + b + height - 1, z - 2, 'air', 0]);
                    session.push([x + 2, y + b + height - 1, z - 2, 'air', 0]);
                    session.push([x - 2, y + b + height - 1, z + 2, 'air', 0]);
                }
            }
        }

        for(let a = -3; a < 4; a++) {
            for(let b = 0; b < 1; b++) {
                for(let c = -3; c < 4; c++) {
                    session.push([x + a, y + b + height - 2, z + c, 'leaves', 1]);
                    session.push([x + 3, y + b + height - 2, z + 3, 'air', 0]);
                    session.push([x - 3, y + b + height - 2, z - 3, 'air', 0]);
                    session.push([x + 3, y + b + height - 2, z - 3, 'air', 0]);
                    session.push([x - 3, y + b + height - 2, z + 3, 'air', 0]);
                    session.push([x + 3, y + b + height - 2, z + 2, 'air', 0]);
                    session.push([x + 3, y + b + height - 2, z - 2, 'air', 0]);
                    session.push([x - 3, y + b + height - 2, z + 2, 'air', 0]);
                    session.push([x - 3, y + b + height - 2, z - 2, 'air', 0]);
                    session.push([x + 2, y + b + height - 2, z + 3, 'air', 0]);
                    session.push([x - 2, y + b + height - 2, z + 3, 'air', 0]);
                    session.push([x + 2, y + b + height - 2, z - 3, 'air', 0]);
                    session.push([x - 2, y + b + height - 2, z - 3, 'air', 0]);
                }
            }
        }

        for(let d = 0; d <= height + 2; d++) {
            session.push([x, y + d + 1, z, 17, 1]);
        }

        session.push([x + 1, y + height, z, 'leaves', 1]);
        session.push([x - 1, y + height, z, 'leaves', 1]);
        session.push([x, y + height, z + 1, 'leaves', 1]);
        session.push([x, y + height, z - 1, 'leaves', 1]);
        session.push([x + 1, y + height + 2, z, 'leaves', 1]);
        session.push([x - 1, y + height + 2, z, 'leaves', 1]);
        session.push([x, y + height + 2, z + 1, 'leaves', 1]);
        session.push([x, y + height + 2, z - 1, 'leaves', 1]);
        session.push([x, y + height + 3, z, 'leaves', 1]);
        session.push([x + 1, y + height + 4, z, 'leaves', 1]);
        session.push([x - 1, y + height + 4, z, 'leaves', 1]);
        session.push([x, y + height + 4, z + 1, 'leaves', 1]);
        session.push([x, y + height + 4, z - 1, 'leaves', 1]);
        session.push([x, y + height + 4, z, 'leaves', 1]);
    };
    function Jungle(x, y, z) {
        let height = Math.floor(Math.random() * 6) + 2;

        for(let a = -2; a < 3; a++) {
            for(let b = 1; b < 3; b++) {
                for(let c = -2; c < 3; c++) {
                        session.push([x + a, y + b + height, z + c, 'leaves', 3]);
                }
            }
        }

        for(let d = 0; d <= height + 2; d++) {
            session.push([x, y + d + 1, z, 17, 3]);

            switch(Math.floor(Math.random() * 10) + 1) {
                case 1:
                    for(let e = 0; e <= height + 2; e++) {
                            session.push([x + 1, y + e, z, 'vine', 2]);
                    }
                    break;

                case 2:
                    for(let e = 0; e <= height + 2; e++) {
                            session.push([x - 1, y + e, z, 'vine', 8]);
                    }
                    break;

                case 3:
                    for(let e = 0; e <= height + 2; e++) {
                            session.push([x, y + e, z + 1, 'vine', 4]);
                    }
                    break;

                case 4:
                    for(let e = 0; e <= height + 2; e++) {
                            session.push([x, y + e, z - 1, 'vine', 1]);
                    }
                    break;
            }
        }

        session.push([x + 1, y + height + 3, z, 'leaves', 3]);
        session.push([x - 1, y + height + 3, z, 'leaves', 3]);
        session.push([x, y + height + 3, z + 1, 'leaves', 3]);
        session.push([x, y + height + 3, z - 1, 'leaves', 3]);
        session.push([x, y + height + 4, z, 'leaves', 3]);
        session.push([x + 1, y + height + 4, z, 'leaves', 3]);
        session.push([x - 1, y + height + 4, z, 'leaves', 3]);
        session.push([x, y + height + 4, z + 1, 'leaves', 3]);
        session.push([x, y + height + 4, z - 1, 'leaves', 3]);
    };
    for(let x = -radius; x <= radius; x++) {
        for(let y = -radius; y <= radius; y++) {
            for(let z = -radius; z <= radius; z++) {
                if(Math.floor(Math.random() * 400) + 0 <= density) {
                    switch(shape) {
                        case "oak":
                            Oak(pX + x, pY + y - 1, pZ + z);
                            break;

                        case "birch":
                            Birch(pX + x, pY + y - 1, pZ + z);
                            break;

                        case "spruce":
                            if(Math.floor(Math.random() * 10) + 1 == 1) {
                                Spruce(pX + x, pY + y - 1, pZ + z);
                            }
                            break;

                        case "jungle":
                            Jungle(pX + x, pY + y - 1, pZ + z);
                            break;
                    }
                }
            }
        }
    }
    return session;
});
methods.set('paint',() => {
    return [0,0,0];
})
class Algorithms {
    static builder (header, build) {
        let r = new Algorithms();
        let [x,y,z] = header.position;
        console.log(build)
        return {
            map:methods.get(build.type)(x,y,z,build),
            foo:this.getFoo(build),
            other:build.height
        }
    };

    static LoadScript(){
        let scripts = require('../script/main.js');
        for (let i in scripts){
            methods.set(scripts[i].name,scripts[i].bin);
        }
    }

    static WhileBuilder(input, build){
        let sessions = [];
        for (let i = 0 ; i < input.length ; i++){
            sessions.push(methods.get(build.type)(x,y,z,build));
        }
        return {
            map:sessions,
            foo:this.getFoo(build),
            other:build.height
        }
    }

    static getFoo(build){
        let setTile = ['sphere','ellipsoid','torus','cone','ellipticTorus'];
        let setLongTile = ['round','circle','ellipse'];
        let setblock = ['forestgen','pumpkins'];
        if(build.type == 'paint'){
            return 'paint';
        }
        if(!!~setblock.indexOf(build.type)){
            return 'setblock'
        }
        if(build.entityMod){
            if(!!~setTile.indexOf(build.type)){
                return 'setEntity';
            }else if(!!~setLongTile.indexOf(build.type)){
                return 'setLongEntity';
            }else{
                return 'summon';
            }
        }else{
            if(!!~setTile.indexOf(build.type)){
                return 'setTile';
            }else if(!!~setLongTile.indexOf(build.type)){
                return 'setLongTile';
            }else{
                return 'setblock'
            }
        }
        return 'Unknown!';
    }
    static returnMethods(){
        return methods;
    }
}

function multiDimensionalUnique(arr) {
    let uniques = [];
    let itemsFound = {};
    for (let i = 0, l = arr.length; i < l; i++) {
        let stringified = JSON.stringify(arr[i]);
        if (itemsFound[stringified]) {
            continue;
        }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

//Algorithms.LoadScript();
module.exports = Algorithms;