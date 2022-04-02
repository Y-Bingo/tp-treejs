"use strict";(self.webpackChunktp_threejs=self.webpackChunktp_threejs||[]).push([[55],{6593:(n,e,o)=>{o.r(e),o.d(e,{default:()=>i});const i="uniform float uSize;\nuniform float uTime;\n\nattribute float aScale;\nattribute vec3 aRandomness;\n\nvarying vec3 vColor;\n\nvoid main() {\n    vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n\n    // Rotate\n    float angle = atan(modelPosition.x, modelPosition.z);\n    float distanceToCenter = length(modelPosition.xz);\n    float angleOffset = (1.0 / distanceToCenter) * uTime;\n    angle += angleOffset;\n    modelPosition.x = cos(angle) * distanceToCenter;\n    modelPosition.z = sin(angle) * distanceToCenter;\n\n    modelPosition.xyz += aRandomness;\n\n    vec4 viewPosition = viewMatrix * modelPosition;\n    gl_Position = projectionMatrix * viewPosition;\n\n    gl_PointSize = uSize * aScale;\n    gl_PointSize *= (1.0 / -viewPosition.z);\n\n    vColor = color;\n}"}}]);
//# sourceMappingURL=55.min_723041b484.js.map