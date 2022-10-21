# JS中的隐式类型转换

## 数学运算符中的类型转换

1. 减、乘、除
我们在对各种非Number类型运用数学运算符(- * /)时，会先将非Number类型转换为Number类型。
```javascript
1 - true // 0， 首先把 true 转换为数字 1， 然后执行 1 - 1
1 - null // 1,  首先把 null 转换为数字 0， 然后执行 1 - 0
1 * undefined //  NaN, undefined 转换为数字是 NaN
2 * ['5'] //  10， ['5']首先会变成 '5', 然后再变成数字 5
```
2. 加法的特殊性
- 当一侧为String类型，被识别为字符串拼接，并会优先将另一侧转换为字符串类型。
- 当一侧为Number类型，另一侧为原始类型，则将原始类型转换为Number类型。
- 当一侧为Number类型，另一侧为引用类型，将引用类型和Number类型转换成字符串后拼接。
以上3点，优先级从高到低，即 3+'abc' 会应用规则 1，而 3+true会应用规则2。

## 逻辑语句中的类型转换
1. 单个变量
如果只有单个变量，会先将变量转为Boolean值。我们可以参考附录的转换表来判断各种类型转变为Boolean后的值。
不过这里有个小技巧：只有 null、undefined、''、NaN、0、false 这几个是 false，其他的情况都是 true，比如 {} , []。

2. 使用==比较中的五条规则
- 规则1: NaN和其他任何类型比较永远返回false（包括和他自己）。
- 规则2: Boolean 和其他任何类型比较，Boolean 首先被转换为 Number 类型。
```javascript
true == 1  // true 
true == '2'  // false, 先把 true 变成 1，而不是把 '2' 变成 true
true == ['1']  // true, 先把 true 变成 1， ['1']拆箱成 '1', 再参考规则3
true == ['2']  // false, 同上
undefined == false // false ，首先 false 变成 0，然后参考规则4
null == false // false，同上
```
- 规则 3：String和Number比较，先将String转换为Number类型。
```javascript
123 == '123' // true, '123' 会先变成 123
'' == 0 // true, '' 会首先变成 0
```
- 规则 4：null == undefined比较结果是true，除此之外，null、undefined和其他任何结果的比较值都为false。
```javascript
null == undefined // true
null == '' // false
null == 0 // false
null == false // false
undefined == '' // false
undefined == 0 // false
undefined == false // false
```
- 规则 5：原始类型和引用类型做比较时，引用类型会依照ToPrimitive规则转换为原始类型。


## 类型转换表
![image](https://user-images.githubusercontent.com/56546775/197099405-1640f4c2-765c-405a-bf9d-22f080d0f67f.png)
