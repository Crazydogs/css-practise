/*
    线条运动 transition 版本
*/

var Animation = function (opt) {
    this.$container = opt.container;
    this.num = opt.num;

    this.lineList = [];
}

Animation.prototype.makeGroup = function () {
    var $group = $(
        '<div style="' + style.groupStyle + '" class="line-animation-group">' +
            '<div style="' + style.pointStyle + '" class="line-animation-point line-animation-point-left"></div>' +
            '<div style="' + style.pointStyle + '" class="line-animation-point line-animation-point-right"></div>' +
            '<div class="line-animation-line"></div>' +
            '<div class="line-animation-line line-animation-line-shadow"></div>' +
        '</div>'
    );
    return $group;
};
