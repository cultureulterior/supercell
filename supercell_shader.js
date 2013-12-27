THREE.SupercellShader = {
	uniforms: {
		"tSize":    { type: "v2", value: new THREE.Vector2( 256, 256 ) },
		"tDiffuse": { type: "t", value: null },
    "dither":   {type: "fv1", value: [4,18,0,15,9,14,8,21,3,20,2,17,11,13,7,23,5,19,1,16,10,12,6,22] }
	},

	vertexShader: [
		"varying vec2 vUv;",
		"void main() {",
			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"
	].join("\n"),

	fragmentShader: [
		"uniform vec2 tSize;",
		"uniform sampler2D tDiffuse;",
		"varying vec2 vUv;",
  "void main() {",
     "float x=floor(vUv.x);",
     "float y=floor(vUv.y);",
     "float supercell=mod(x+floor(y*5.0), 24.0);",
     "float level=0.0;",
     "for (int i = 0 ; i < 24 ; i++ )",
     "{ if (int(supercell) == i) { level=(dither[i]+1.0)/25.0; }}",
     "vec2 tex = vUv * tSize - tSize / 2;",
		 "vec4 color = texture2D( tDiffuse, vUv );",
     "float average = ( color.r + color.g + color.b ) / 3.0;",
     "gl_FragColor=vec4(vec3(step(average,level)),1.0);",
		"}"
	].join("\n")
};
