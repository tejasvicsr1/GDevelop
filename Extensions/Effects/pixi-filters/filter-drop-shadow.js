/*!
 * @pixi/filter-drop-shadow - v2.6.2
 * Compiled Fri, 20 Dec 2019 18:59:17 UTC
 *
 * @pixi/filter-drop-shadow is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?i(exports,require("@pixi/filter-kawase-blur"),require("pixi.js")):"function"==typeof define&&define.amd?define(["exports","@pixi/filter-kawase-blur","pixi.js"],i):i(t.__filters={},t.PIXI.filters,t.PIXI)}(this,function(t,i,e){"use strict";var r="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",n="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform vec3 color;\nvoid main(void){\n    vec4 sample = texture2D(uSampler, vTextureCoord);\n\n    // Un-premultiply alpha before applying the color\n    if (sample.a > 0.0) {\n        sample.rgb /= sample.a;\n    }\n\n    // Premultiply alpha again\n    sample.rgb = color.rgb * sample.a;\n\n    // alpha user alpha\n    sample *= alpha;\n\n    gl_FragColor = sample;\n}",o=function(t){function o(o){o&&o.constructor!==Object&&(console.warn("DropShadowFilter now uses options instead of (rotation, distance, blur, color, alpha)"),o={rotation:o},void 0!==arguments[1]&&(o.distance=arguments[1]),void 0!==arguments[2]&&(o.blur=arguments[2]),void 0!==arguments[3]&&(o.color=arguments[3]),void 0!==arguments[4]&&(o.alpha=arguments[4])),o=Object.assign({rotation:45,distance:5,color:0,alpha:.5,shadowOnly:!1,kernels:null,blur:2,quality:3,pixelSize:1,resolution:e.settings.RESOLUTION},o),t.call(this);var l=o.kernels,a=o.blur,s=o.quality,u=o.pixelSize,c=o.resolution;this._tintFilter=new e.Filter(r,n),this._tintFilter.uniforms.color=new Float32Array(4),this._tintFilter.resolution=c,this._blurFilter=l?new i.KawaseBlurFilter(l):new i.KawaseBlurFilter(a,s),this.pixelSize=u,this.resolution=c,this.targetTransform=new e.Matrix;var p=o.shadowOnly,h=o.rotation,f=o.distance,d=o.alpha,g=o.color;this.shadowOnly=p,this.rotation=h,this.distance=f,this.alpha=d,this.color=g,this._updatePadding()}t&&(o.__proto__=t),o.prototype=Object.create(t&&t.prototype),o.prototype.constructor=o;var l={resolution:{configurable:!0},distance:{configurable:!0},rotation:{configurable:!0},alpha:{configurable:!0},color:{configurable:!0},kernels:{configurable:!0},blur:{configurable:!0},quality:{configurable:!0},pixelSize:{configurable:!0}};return o.prototype.apply=function(t,i,e,r){var n=t.getRenderTarget();n.transform=this.targetTransform,this._tintFilter.apply(t,i,n,!0),n.transform=null,this._blurFilter.apply(t,n,e,r),!0!==this.shadowOnly&&t.applyFilter(this,i,e,!1),t.returnRenderTarget(n)},o.prototype._updatePadding=function(){this.padding=this.distance+2*this.blur},o.prototype._updateTargetTransform=function(){this.targetTransform.tx=this.distance*Math.cos(this.angle),this.targetTransform.ty=this.distance*Math.sin(this.angle)},l.resolution.get=function(){return this._resolution},l.resolution.set=function(t){this._resolution=t,this._tintFilter&&(this._tintFilter.resolution=t),this._blurFilter&&(this._blurFilter.resolution=t)},l.distance.get=function(){return this._distance},l.distance.set=function(t){this._distance=t,this._updatePadding(),this._updateTargetTransform()},l.rotation.get=function(){return this.angle/e.DEG_TO_RAD},l.rotation.set=function(t){this.angle=t*e.DEG_TO_RAD,this._updateTargetTransform()},l.alpha.get=function(){return this._tintFilter.uniforms.alpha},l.alpha.set=function(t){this._tintFilter.uniforms.alpha=t},l.color.get=function(){return e.utils.rgb2hex(this._tintFilter.uniforms.color)},l.color.set=function(t){e.utils.hex2rgb(t,this._tintFilter.uniforms.color)},l.kernels.get=function(){return this._blurFilter.kernels},l.kernels.set=function(t){this._blurFilter.kernels=t},l.blur.get=function(){return this._blurFilter.blur},l.blur.set=function(t){this._blurFilter.blur=t,this._updatePadding()},l.quality.get=function(){return this._blurFilter.quality},l.quality.set=function(t){this._blurFilter.quality=t},l.pixelSize.get=function(){return this._blurFilter.pixelSize},l.pixelSize.set=function(t){this._blurFilter.pixelSize=t},Object.defineProperties(o.prototype,l),o}(e.Filter);t.DropShadowFilter=o,Object.defineProperty(t,"__esModule",{value:!0})}),Object.assign(PIXI.filters,this?this.__filters:__filters);
