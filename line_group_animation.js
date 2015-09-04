/*
    opt: {
        container: jquery容器,
        length: 长度，如果 container 拥有确定宽度，可以使用百分比,
        positionX: 相对 container 的 x 轴位置
        positionY: 相对 container 的 y 轴位置
        rotateY: [
            初始值，
            中间值，
            结束值
        ],
        rotateZ: [
            初始值，
            中间值，
            结束值
        ],
        circulateTime: 循环时间
    }
*/
var AnimationLayer = function (lineList, $container) {
    this.lineList = lineList;
    this.$container = $container;
}

AnimationLayer.prototype.makeGroup = function (opt, id) {
    var style = this.setStyle(opt, id);
    var $group = $(
        '<div style="' + style.groupStyle + '" class="line-animation-group">' +
            '<div style="' + style.pointStyle + '" class="line-animation-point line-animation-point-left"></div>' +
            '<div style="' + style.pointStyle + '" class="line-animation-point line-animation-point-right"></div>' +
            '<div class="line-animation-line"></div>' +
            '<div class="line-animation-line line-animation-line-shadow"></div>' +
        '</div>'
    );
    return $group;
}
AnimationLayer.prototype.getStyleNode = function () {
    var styleList = document.styleSheets;
    for (var i = 0; i < styleList.length; i++) {
        if (styleList[i].ownerNode.id === 'line-animation-keyframs') {
            return styleList[i];
        }
    }
    return false;
}
AnimationLayer.prototype.setStyle = function (opt, id) {
    var groupStyle = '';
    groupStyle += 'width:' + opt.length + ';';
    groupStyle += 'left:' + opt.positionX + ';';
    groupStyle += 'top:' + opt.positionY + ';';
    groupStyle += '-webkit-animation: line' + id + ' ' + opt.circulateTime + 's ease-in-out infinite;';
    groupStyle += '-moz-animation: line' + id + ' ' + opt.circulateTime + 's ease-in-out infinite;';
    groupStyle += '-ms-animation: line' + id + ' ' + opt.circulateTime + 's ease-in-out infinite;';
    groupStyle += 'animation: line' + id + ' ' + opt.circulateTime + 's ease-in-out infinite;';

    var pointStyle = '';
    pointStyle += '-webkit-animation: point' + id + ' ' + opt.circulateTime + 's ease-in-out infinite;';
    pointStyle += '-moz-animation: point' + id + ' ' + opt.circulateTime + 's ease-in-out infinite;';
    pointStyle += '-ms-animation: point' + id + ' ' + opt.circulateTime + 's ease-in-out infinite;';
    pointStyle += 'animation: point' + id + ' ' + opt.circulateTime + 's ease-in-out infinite;';

    var keyFrames = '';
    keyFrames += '@keyframes line' + id + ' {' +
        '0% {transform: rotateX(0deg) rotateY(' + opt.rotateY[0] + 'deg) rotateZ(' + opt.rotateZ[0] + 'deg)} ' +
        '50% {transform: rotateX(0deg) rotateY(' + opt.rotateY[1] + 'deg) rotateZ(' + opt.rotateZ[1] + 'deg)} ' +
        '100% {transform: rotateX(0deg) rotateY(' + opt.rotateY[2] + 'deg) rotateZ(' + opt.rotateZ[2] + 'deg)} ' +
    '}';
    var webkitKeyFrames = keyFrames.replace(/keyframes/g, '-webkit-keyframes');

    var keyFramesPoint = '';
    keyFramesPoint += '@keyframes point' + id + ' {' +
        '0% {transform: rotateZ(-' + opt.rotateZ[0] + 'deg) rotateY(-' + opt.rotateY[0] + 'deg) rotateX(0deg)} ' +
        '50% {transform: rotateZ(-' + opt.rotateZ[1] + 'deg) rotateY(-' + opt.rotateY[1] + 'deg) rotateX(0deg)} ' +
        '100% {transform: rotateZ(-' + opt.rotateZ[2] + 'deg) rotateY(-' + opt.rotateY[2] + 'deg) rotateX(0deg)} ' +
    '}';
    var webkitKeyFramesPoint = '';
    var webkitKeyFramesPoint = keyFramesPoint.replace(/keyframes/g, '-webkit-keyframes');

    var styleNode = this.getStyleNode();
    if (styleNode) {
        try {
            styleNode.insertRule(webkitKeyFrames, 0);
        } catch (e) {
        }
        styleNode.insertRule(keyFrames, 0);
        try {
            styleNode.insertRule(webkitKeyFramesPoint, 0);
        } catch (e) {
        }
        styleNode.insertRule(keyFramesPoint, 0);
    }
    return {
        groupStyle: groupStyle,
        pointStyle: pointStyle
    }
}
AnimationLayer.prototype.init = function () {
    for (var i = 0; i < this.lineList.length; i ++) {
        var $lineGroup = this.makeGroup(this.lineList[i], i);
        this.$container.append($lineGroup);
    }
}
