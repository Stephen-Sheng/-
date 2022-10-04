# CSS中的百分比问题

## - width & height
宽和高在使用百分比值时，其参照都是元素的包含块（Containing Block）。width参照包含块的宽度，height参照包含块的高度。在大部分情况下，包含块就是父元素的内容区（盒模型里的content）。
当一个元素的高度使用百分比值，如果其包含块没有明确的高度定义（也就是说，取决于内容高度），且这个元素不是绝对定位，则该百分比值等同于auto。auto是初始默认值，所以看起来就像是“失效”了。
## - margin & padding
对于margin和padding，其任意方向的百分比值，参照都是包含块的**宽度**。
## - border-radius
为一个元素的border-radius定义的百分比值，参照物是这个元素自身的尺寸。也就是说，假如这个元素宽是60px，高是50px（border-box的尺寸），那么border-radius:50%的结果等同于border-radius:30px/20px;。
## - background-position
![image](https://user-images.githubusercontent.com/56546775/193801566-98955b2e-1509-46fb-905b-d63b9d3d1f24.png)
background-position的百分比值，取的参照是一个减法计算值，由放置背景图的区域尺寸，减去背景图的尺寸得到，可以为负值。对照上面的示例，思考一下，应该可以感受到，以这个减法计算值为参照的话，正好可以符合我们感官上对背景图位置的理解。
## - font-size
参照是直接父元素的font-size。例如，一个元素的直接父元素的font-size是14px，无论这个是直接定义的，还是继承得到的，当该元素定义font-size:100%;，获得的效果就是font-size:14px
## - line-height
参照是元素自身的font-size。例如，一个元素的font-size是12px，那么line-height:150%;的效果是line-height:18px;。
## - vertical-align
参照是元素自身的line-height（和前面很有关联吧，所以我排在了这里）。例如，一个元素的line-height是30px，则vertical-align:10%;的效果是vertical-align:3px;。
## - transform:translate
平移变换，在水平方向和垂直方向上也可以使用百分比，其参照是变换的边界框的尺寸（等于这个元素自己的border-box尺寸）。例如，一个宽度为150px，高度为100px的元素，定义transform:translate(50%, 50%)的效果是transform:translate(75px, 50px);

# 百分比的继承问题
请注意，当百分比值用于可继承属性时，只有结合参照值计算后的绝对值会被继承，而不是百分比值本身。例如，一个元素的font-size是14px，并定义了line-height:150%;，那么该元素的下一级子元素继承到的line-height就是21px，而不会再和子元素自己的font-size有关。
