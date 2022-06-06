const canvas = document.querySelector(`canvas`);
    const webgl = canvas.getContext(`webgl`);
    if(!webgl){ throw new Error("WebGL not supported");}
    webgl.clearColor(0.0,1.0,1.0,1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    const vertices = new Float32Array([

//1st
-1,0.2, -0.6,0.2, -1,-0.2,
//2nd
-0.6,-0.2, -0.6,0.2, -1,-0.2,
//3rd
-0.6,0.2, 0.8,0.2, -0.6,-0.2,
//4th
0.8,-0.2, 0.8,0.2, -0.6,-0.2,
//5th
0.8,0.2, 1.0,0.2, 0.8,-0.2,
//6th
1.0,-0.2, 1.0,0.2, 0.8,-0.2,
//7th
-0.6,-0.2, -0.4,-0.2, -0.6,-0.4,
//8th
-0.4,-0.4, -0.4,-0.2, -0.6,-0.4,
//9th
0.6,-0.2, 0.8,-0.2, 0.6,-0.4,
//10th
0.8,-0.4, 0.8,-0.2, 0.6,-0.4,
//11th
-0.2,0.2, -0.2,0.4, -0.6,0.2,
//12th
-0.2,0.4, 0.6,0.4, -0.2,0.2,
//13th
0.6,0.2, 0.6,0.4, -0.2,0.2,
//14th
0.6,0.4, 0.8,0.2, 0.6,0.2

]);
    
const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(vertexShader,
`attribute vec2 pos;
void main() { gl_Position = vec4(pos,0,2); }`); //w=1 for normal size
webgl.compileShader(vertexShader);

const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(fragmentShader,
`void main() { gl_FragColor = vec4(1.0,0.0,1.0,1.0); }`);
webgl.compileShader(fragmentShader);

const program = webgl.createProgram();
webgl.attachShader(program, vertexShader);
webgl.attachShader(program, fragmentShader);
webgl.linkProgram(program);

const positionLocation = webgl.getAttribLocation(program, `pos`);
webgl.enableVertexAttribArray(positionLocation);
webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);
webgl.useProgram(program);
webgl.drawArrays(webgl.TRIANGLES, 0, 42);