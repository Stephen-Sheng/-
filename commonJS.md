# CommonJS 与 ES6 Export

## 1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。通过esmodule导入的变量是不能重新赋值修改的。
## 2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
CommonJS这种加载称为“编译时加载”或者静态加载，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。而ES6可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高;
## 3. CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段

***
另外，module.exports与require和export与import必须成对使用
