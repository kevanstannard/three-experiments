export default {
  title: 'Slides',
  description: 'Simple slides scene',
  tags: 'Plane',
  public: false,
  scripts: [
    // 'http://127.0.0.1:8080/build/three.js', // For three.js dev
    '../../libs/three/r92/three.min.js',
    '../../libs/three/r92/controls/OrbitControls.js',
    '../../libs/threex/THREEx.WindowResize.js',
    '../../libs/dat.gui/0.6.2/dat.gui.min.js',
    '../../libs/stemkoski/KeyboardState.js',
  ],
  styles: ['../../libs/dat.gui/0.6.2/dat.gui.css'],
};
