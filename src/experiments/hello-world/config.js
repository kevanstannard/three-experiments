export default {
  title: 'Hello World',
  description: 'Simple Hello World application with common elements for a scene',
  tags: 'Cube',
  public: false,
  scripts: [
    // 'http://127.0.0.1:8080/build/three.js', // For three.js dev
    '../../libs/three/r87/three.min.js',
    '../../libs/three/r87/controls/OrbitControls.js',
    '../../libs/threex/THREEx.WindowResize.js',
    '../../libs/dat.gui/0.6.2/dat.gui.min.js',
  ],
  styles: [
    '../../libs/dat.gui/0.6.2/dat.gui.css',
  ],
};
