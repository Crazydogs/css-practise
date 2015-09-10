/*
    线条运动 transition 版本
*/

var Animation = function (opt) {
    this.$container = $(opt.container);
    this.num = opt.num;
    this.groupList = [];

    for (var i = 0; i < this.num; i++) {
        var $lineGroup = this.makeGroup();
        this.setRandomStyle($lineGroup);
        this.setTimeChange($lineGroup);
        this.groupList.push($lineGroup);
        this.$container.append($lineGroup);
    }

    return this.$container;
}

Animation.prototype.makeGroup = function () {
    var $group = $(
        '<div class="line-animation-group">' +
            '<div class="line-animation-point line-animation-point-left"></div>' +
            '<div class="line-animation-point line-animation-point-right"></div>' +
            '<div class="line-animation-line"></div>' +
            '<div class="line-animation-line line-animation-line-shadow"></div>' +
        '</div>'
    );
    return $group;
};
Animation.prototype.setRandomStyle = function ($lineGroup) {
    var length = Math.ceil(Math.random() * 100 + 20) + '%';
    var positionY = Math.ceil(Math.random() * 100) + '%';
    var positionX = Math.ceil(Math.random() * 100) + 20 + '%';
    var positionZ = Math.ceil(Math.random() * 100) + 100 + 'px';
    var rotateX = Math.ceil(Math.random() * 360) + 'deg';
    var rotateY = Math.ceil(Math.random() * 360) + 'deg';
    var rotateZ = Math.ceil(Math.random() * 360) + 'deg';

    var groupTransform = 'rotatex(' + rotateX + ') rotatey(' + rotateY + ') rotatez(' + rotateZ + ')' +
        ' translate3d('+positionX+', ' + positionY + ', ' + positionZ + ')';
    $lineGroup.css({
        width: length,
        '-webkit-transform': groupTransform,
        '-moz-transform': groupTransform,
        '-ms-transform': groupTransform,
        transform: groupTransform
    });
    $lineGroup.find('.line-animation-point').css({
        '-webkit-transform': 'rotatez(' + (-rotateZ) + ') rotatey(' + (-rotateY) + ') rotatex(' + (-rotateX) + ')',
        '-moz-transform': 'rotatez(' + (-rotateZ) + ') rotatey(' + (-rotateY) + ') rotatex(' + (-rotateX) + ')',
        '-ms-transform': 'rotatez(' + (-rotateZ) + ') rotatey(' + (-rotateY) + ') rotatex(' + (-rotateX) + ')',
        transform: 'rotatez(-' + rotateZ + ') rotatey(-' + rotateY + ') rotatex(-' + rotateX + ')'
    });
}
Animation.prototype.setTimeChange = function ($lineGroup) {
    var self = this;
    var time = Math.ceil(Math.random() * 50) + 20;
    $lineGroup.css({
        '-webkit-transition': 'transform ' + time + 's',
        '-moz-transition': 'transform ' + time + 's',
        '-ms-transition': 'transform ' + time + 's',
        'transition': 'transform ' + time + 's'
    });
    $lineGroup.find('.line-animation-point').css({
        '-webkit-transition': 'transform ' + time + 's',
        '-moz-transition': 'transform ' + time + 's',
        '-ms-transition': 'transform ' + time + 's',
        'transition': 'transform ' + time + 's'
    });
    setTimeout(function () {
        self.setRandomStyle($lineGroup);
    }, 100);
    setTimeout(function () {
        self.setTimeChange($lineGroup);
    }, time * 1000);
}
