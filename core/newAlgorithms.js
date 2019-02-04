const methods = new Map();
methods.set('round',(d, r, x, y, z) => {
    let session = [];
    switch (d) {
        case "x":
            for (let i = -r; i <= r; i++) {
                for (let j = -r; j <= r; j++) {
                    if (i * i + j * j < r * r) {
                        session.push([x, y + i, z + j]);
                    }
                }
            }
            break;
        case "y":
            for (let i = -r; i <= r; i++) {
                for (let j = -r; j <= r; j++) {
                    if (i * i + j * j < r * r) {
                        session.push([x + i, y, z + j]);
                    }
                }
            }
            break;
        case "z":
            for (let i = -r; i <= r; i++) {
                for (let j = -r; j <= r; j++) {
                    if (i * i + j * j < r * r) {
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
methods.set('circle',(d, r, x, y, z) => {
    let session = [];
    switch (d) {
        case "x":
            for (let i = -r; i <= r; i++) {
                for (let j = -r; j <= r; j++) {
                    if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)) {
                        session.push([x, y + i, z + j]);
                    }
                }
            }
            break;
        case "y":
            for (let i = -r; i <= r; i++) {
                for (let j = -r; j <= r; j++) {
                    if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)) {
                        session.push([x + i, y, z + j]);
                    }
                }
            }
            break;
        case "z":
            for (let i = -r; i <= r; i++) {
                for (let j = -r; j <= r; j++) {
                    if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)) {
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
methods.set('sphere',(t, r, x, y, z) => {
    let session = [];
    switch (t) {
        case "hollow":
            for (let i = -r; i <= r; i++) {
                for (let j = -r; j <= r; j++) {
                    for (let k = -r; k <= r; k++) {
                        if (i * i + j * j + k * k <= r * r && i * i + j * j + k * k >= (r - 1) * (r - 1)) {
                            session.push([x + i, y + j, z + k]);
                        }
                    }
                }
            }
            break;
        case "solid":
            for (let i = -r; i <= r; i++) {
                for (let j = -r; j <= r; j++) {
                    for (let k = -r; k <= r; k++) {
                        if (i * i + j * j + k * k <= r * r) {
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
methods.set('ellipse',(d, a, b, x, y, z) => {
    let session = [];
    switch (d) {
        case "x":
            for (let i = -a; i <= a; i++) {
                for (let j = -b; j <= b; j++) {
                    if ((i * i) / (a * a) + (j * j) / (b * b) < 1) {
                        session.push([x, y + i, j + z]);
                    }
                }
            }
            break;
        case "y":
            for (let i = -a; i <= a; i++) {
                for (let j = -b; j <= b; j++) {
                    if ((i * i) / (a * a) + (j * j) / (b * b) < 1) {
                        session.push([x + i, y, j + z]);
                    }
                }
            }
            break;
        case "z":
            for (let i = -a; i <= a; i++) {
                for (let j = -b; j <= b; j++) {
                    if ((i * i) / (a * a) + (j * j) / (b * b) < 1) {
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
methods.set('ellipsoid',(a, b, c, x, y, z) =>{
    let session = [];
    for (let i = -a; i <= a; i++) {
        for (let j = -b; j <= b; j++) {
            for (let k = -c; k <= c; k++) {
                if ((i * i) / (a * a) + (j * j) / (b * b) + (k * k) / (c * c) <= 1) {
                    session.push([x + i, y + j, z + k]);
                }
            }
        }
    }
    return session;
});
methods.set('torus',(d, a, c, x, y, z, f) => {
    let session = [];
    //let session = [];
    let accuracy = 1 / f;
    let max = Math.PI * 2;
    switch (d) {
        case "x":
            for (let v = 0; v < max; v = v + accuracy) {
                for (let u = 0; u < max; u = u + accuracy) {
                    session.push([Math.round(Math.cos(u) * (a * Math.cos(v) + c)) + x, Math.round(Math.sin(u) * (a * Math.cos(v) + c)) + y, Math.round(a * Math.sin(v)) + z]);
                }
            }
            break;

        case "y":
            for (let v = 0; v < max; v = v + accuracy) {
                for (let u = 0; u < max; u = u + accuracy) {
                    session.push([Math.round(Math.cos(u) * (a * Math.cos(v) + c)) + x, Math.round(a * Math.sin(v)) + y, Math.round(Math.sin(u) * (a * Math.cos(v) + c)) + z]);
                }
            }
            break;
        case "z":
            for (let v = 0; v < max; v = v + accuracy) {
                for (let u = 0; u < max; u = u + accuracy) {
                    session.push([Math.round(a * Math.sin(v)) + x, Math.round(Math.cos(u) * (a * Math.cos(v) + c)) + y, Math.round(Math.sin(u) * (a * Math.cos(v) + c)) + z]);
                }
            }
            break;
        default:
            break;
    }
    return multiDimensionalUnique(session);
});
methods.set('cone',(d, h, r, x, y, z, f) => {
    let session = [];
    h = parseInt(h);
    r = parseInt(r);
    let max = Math.PI * 2;
    let accuracy = 1 / f;
    switch (d) {
        case "z":
            for (let u = 0; u < h; u++) {
                for (let i = 0; i < max; i = i + accuracy) {
                    session.push([Math.floor(((h - u) / h) * r * Math.cos(i)) + x, Math.floor(((h - u) / h) * r * Math.sin(i)) + y, u + z]);
                }
            }
            break;
        case "y":
            for (let u = 0; u < h; u++) {
                for (let i = 0; i < max; i = i + accuracy) {
                    session.push([Math.floor(((h - u) / h) * r * Math.cos(i)) + x, u + y, Math.floor(((h - u) / h) * r * Math.sin(i)) + z]);
                }
            }
            break;
        case "x":
            for (let u = 0; u < h; u++) {
                for (let i = 0; i < max; i = i + accuracy) {
                    session.push([u + x, Math.floor(((h - u) / h) * r * Math.cos(i)) + y, Math.floor(((h - u) / h) * r * Math.sin(i)) + z]);
                }
            }
            break;
        default:
            break;
    }

    return multiDimensionalUnique(session);
});
methods.set('ellipticTorus',(d, a, b, c, x, y, z, f) =>{
    let session = [];
    let accuracy = 1 / f;
    let max = Math.PI * 2;
    switch(d) {
        case 'z':
            for(let v = 0 ; v < max ; v = v + accuracy){
                for(let u = 0 ; u < max ; u = u + accuracy){
                    session.push([x + Math.round((c + (a * Math.cos(v))) * Math.cos(u)), y + Math.round((c + (a * Math.cos(v))) * Math.sin(u)), z + Math.round(b * Math.sin(v))]);
                }
            }
            break;
        case 'y':
            for(let v = 0 ; v < max ; v = v + accuracy){
                for(let u = 0 ; u < max ; u = u + accuracy){
                    session.push([x + Math.round((c + (a * Math.cos(v))) * Math.cos(u)), y + Math.round(b * Math.sin(v)), z + Math.round((c + (a * Math.cos(v))) * Math.sin(u))]);
                }
            }
            break;
        case 'x':
            for(let v = 0 ; v < max ; v = v + accuracy){
                for(let u = 0 ; u < max ; u = u + accuracy){
                    session.push([x + Math.round(b * Math.sin(v)), y + Math.round((c + (a * Math.cos(v))) * Math.sin(u)), z + Math.round((c + (a * Math.cos(v))) * Math.cos(u))]);
                }
            }
            break;
        default:
            break;
    }
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