var rollup = require( 'rollup' );
var babel = require('rollup-plugin-babel');

console.log('【编译中】--building...请稍后')
rollup.rollup({
    entry: 'src/main.js',
    plugins: [ babel() ]
})
.then( function ( bundle ) {
    bundle.write({
        format: 'umd',
        moduleName: 'weSwiper', //umd或iife模式下，若入口文件含 export，必须加上该属性
        dest: 'dist/weSwiper.js'
    });
    console.log('【编译完成】--finished')
})
.catch( function (res) {
  console.log(res)
});
