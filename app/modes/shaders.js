'use strict';

let ShaderMode = require('../shadermode');

let bubbles = new ShaderMode({ id: 'modeBubbles',
                               title: 'Bubbles',
                               pixelShaderName: 'bubblesFrag' });

let caustic = new ShaderMode({ id: 'modeCaustic',
                               title: 'Caustic',
                               pixelShaderName: 'causticFrag' });

let cloudten = new ShaderMode({ id: 'modeCloudTen',
                                title: 'Cloud Ten',
                                pixelShaderName: 'cloudTenFrag',
                                loadUniforms: function() {
	                          var tex = THREE.ImageUtils.loadTexture('media/tex16.png');
	                          tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
                                  var res = new THREE.Vector2(256.0, 256.0);
                                  return { input_channel0: { type: "t", value: tex },
                                           input_channel0_resolution: { type: "v2", value: res } };
                                }
                              });

let disco = new ShaderMode({ id: 'modeDisco',
                             title: 'Disco',
                             // audio: audioDisco,
                             pixelShaderName: 'discoFrag' });

let echoplex = new ShaderMode({ id: 'modeEchoplex',
                                title: 'Echoplex',
                                pixelShaderName: 'echoplexFrag',
                                loadUniforms: function() {
	                          var tex = THREE.ImageUtils.loadTexture('media/tex07.jpg');
	                          tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
                                  return { input_channel0: { type: "t", value: tex } };
                                }
                              });

let flame = new ShaderMode({ id: 'modeFlame',
                             title: 'Flame',
                             pixelShaderName: 'flameFrag' });

let hell = new ShaderMode({ id: 'modeHell',
                            title: 'Hell',
                            pixelShaderName: 'hellFrag',
                            loadUniforms: function() {
	                      var tex = THREE.ImageUtils.loadTexture('media/tex16.png');
	                      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
                              var res = new THREE.Vector2(256.0, 256.0);
                              return { input_channel0: { type: "t", value: tex },
                                       input_channel0_resolution: { type: "v2", value: res } };
                            }
                          });

let nyan = new ShaderMode({ id: 'modeNyan',
                            title: 'Nyan',
                            pixelShaderName: 'nyanFrag',
                            disableKinect: true,
                            loadUniforms: function() {
	                      var anim = THREE.ImageUtils.loadTexture('media/tex14.png');
                              var stars = THREE.ImageUtils.loadTexture('media/tex03.jpg');
	                      stars.wrapS = stars.wrapT = THREE.RepeatWrapping;
	                      anim.wrapS = anim.wrapT = THREE.RepeatWrapping;
                              anim.minFilter = anim.magFilter = THREE.NearestFilter;
                              return { input_channel0: { type: "t", value: anim },
                                       input_channel1: { type: "t", value: stars },
                                       input_resolution: { type: "v2", value: new THREE.Vector2(240.0, 140.0) }
                                     };
                            }
                          });


let ribbon = new ShaderMode({ id: 'modeRibbon',
                              title: 'Ribbon',
                              pixelShaderName: 'ribbonFrag' });

let seascape = new ShaderMode({ id: 'modeSeascape',
                                title: 'Seascape',
                                pixelShaderName: 'seascapeFrag' });

let stardust = new ShaderMode({ id: 'modeStardust',
                                title: 'Stardust',
                                pixelShaderName: 'stardustFrag' });

let storm = new ShaderMode({ id: 'modeStorm',
                             title: 'Storm',
                             pixelShaderName: 'stormFrag',
                             loadUniforms: function() {
	                       var tex = THREE.ImageUtils.loadTexture('media/tex16.png');
	                       tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
                               var res = new THREE.Vector2(256.0, 256.0);
                               return { input_channel0: { type: "t", value: tex },
                                        input_channel0_resolution: { type: "v2", value: res } };
                             }
                        });

let truchet = new ShaderMode({ id: 'modeTruchet',
                               title: 'Truchet',
                               pixelShaderName: 'truchetFrag',
                               loadUniforms: function() {
                                 var cube = THREE.ImageUtils.loadTextureCube(['media/cube00.png',
	                                                                      'media/cube01.png',
	                                                                      'media/cube02.png',
	                                                                      'media/cube03.png',
	                                                                      'media/cube04.png',
	                                                                      'media/cube05.png']);
                                 // yes, the resolution given is not correct. this is because the
                                 // original shader code has a bug in it when x-res > y-res.
                                 return {
                                   input_resolution: { type: "v2", value: new THREE.Vector2(320.0, 480.0) },
                                   input_channel0: { type: "t", value: cube }
                                 };
                               }
                             });


let tunnel = new ShaderMode({ id: 'modeTunnel',
                              title: 'Tunnel',
                              pixelShaderName: 'tunnelFrag' });

let vortex = new ShaderMode({ id: 'modeVortex',
                              title: 'Vortex',
                              pixelShaderName: 'vortexFrag',
                              loadUniforms: function() {
	                        var tex = THREE.ImageUtils.loadTexture('media/tex16.png');
	                        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
                                var res = new THREE.Vector2(256.0, 256.0);
                                return { input_channel0: { type: "t", value: tex },
                                         input_channel0_resolution: { type: "v2", value: res } };
                              }
                            });

let worms = new ShaderMode({ id: 'modeWorms',
                             title: 'Worms',
                             pixelShaderName: 'wormsFrag' });

export default {
  'bubbles': bubbles,
  'caustic': caustic,
  'cloudten': cloudten,
  'worms': worms
};