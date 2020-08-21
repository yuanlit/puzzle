function Ping() {
    this.oUl = null;
    // 所有的li
    this.aLi = null;
    this.len = 0;
    this.oLi = null;
    this.num = 0;
    this.zIndex = 2;
    this.arr = [];
}

Ping.prototype.init = function (id, num) {
    this.oUl = document.querySelector(id);
    this.oUl.innerHTML = this.sheng(num);
    this.aLi = document.querySelectorAll("li");
    this.len = this.aLi.length;
    this.oLi = this.aLi[this.len - 1];
    this.oLi.className = 'active';
    this.num = num;
    this.ding();
    this.click();
    this.jian();
}

Ping.prototype.win = function(cb) {
    this.oUl.innerHTML = "";
    this.oUl.style.background = "url(./img/star.jpg)";
    this.oUl.style.backgroundSize = "100% 100%";
    let opcityNum = 0.1;
    let timer = setInterval(()=>{
        opcityNum += 0.1;
        this.oUl.style.opacity = opcityNum;
        if(opcityNum > 1) {
            window.clearInterval(timer);
            if(cb instanceof Function) {
                cb();
            }
        };
    }, 200);
}

// 判断合并
Ping.prototype.he = function() {
    let arr1 = [];
    let arr2 = [];
    for(let i = 0; i< this.len; i++) {
        arr1.push(this.aLi[i].index);
        arr2.push(this.arr[i][2]);
    }
    let result = arr1.toString() == arr2.toString();
    if(result) {
        let _self = this;
        this.num++;
        // 移动时音效
        winPalyer();
        this.win(next);
        function next() {
            alert("恭喜你,闯关成功!");
            setTimeout(()=>{
                _self.oUl.style.background = "none";
                _self.init("ul", _self.num);
            }, 1000)
        }
    }
}

// 通过index 找到 li
Ping.prototype.getLiByIndex = function (index) {
    for (let i = 0; i < this.len; i++) {
        if (this.aLi[i].index === index) {
            return this.aLi[i];
        }
    }
}

// 键盘移动
Ping.prototype.jian = function () {
    let that = this;
    document.onkeydown = function (e) {
        var ev = ev || event;
        let li = undefined;
        switch (ev.keyCode) {
            case 37: //zuo
                if (that.oLi.index + 1 <= that.len - 1) {
                    li = that.getLiByIndex(that.oLi.index + 1);
                }
                break;
            case 39: //you
                if (that.oLi.index - 1 >= 0) {
                    li = that.getLiByIndex(that.oLi.index - 1);
                }
                break;
            case 38: // shang
                if (that.len - that.oLi.index >= that.num) {
                    li = that.getLiByIndex(that.oLi.index + that.num);
                }
                break;
            case 40: // xia
                if (that.oLi.index >= that.num) {
                    li = that.getLiByIndex(that.oLi.index - that.num);
                }
                break;
            default:
                break;
        }
        if (!li) return;
        that.move(li);
    }
}
// 判断是否可以移动
Ping.prototype.pan = function (li) {
    let index = li.index;
    let num = this.oLi.index;
    if ((num % this.num) === 0) { // zuo
        if (index + this.num == num || index - this.num === num || index - 1 === num) {
            return true;
        }
    } else if ((num % this.num) === (this.num - 1)) { //you
        if (index + this.num == num || index - this.num === num || index + 1 === num) {
            return true;
        }
    } else { // zhong
        if (index + this.num == num || index - this.num === num || index + 1 === num || index - 1 === num) {
            return true;
        }
    }
    return false;
}

// 移动
Ping.prototype.move = function (li) {
    if (this.pan(li)) {
        li.style.left = this.arr[this.oLi.index][0] + "px";
        li.style.top = this.arr[this.oLi.index][1] + "px";
        this.oLi.style.left = this.arr[li.index][0] + "px";
        this.oLi.style.top = this.arr[li.index][1] + "px";
        [this.oLi.index, li.index] = [li.index, this.oLi.index]
        movePlay();
        this.he();
    }
}

// 点击
Ping.prototype.click = function () {
    let that = this;
    for (let i = 0; i < this.len; i++) {
        this.aLi[i].onclick = function () {
            this.style.zIndex = that.zIndex++;
            that.move(this);
        }
    }
}

// 生成元素 li
Ping.prototype.sheng = function (num) {
    this.oUl.style.width = 2 + num * 2 + num * 100 + 'px';
    this.oUl.style.height = num * 2 + num * 100 + 'px';
    let n = num * num;
    let str = '';
    for (let i = 0; i < n; i++) {
        str += '<li></li>'
    }
    return str;
}

// 定位
Ping.prototype.ding = function () {
    let arr1 = [];
    let arrA = [];
    for (let i = 0; i < this.len; i++) {
        arr1.push([this.aLi[i].offsetLeft, this.aLi[i].offsetTop, i]);
        arrA.push([this.aLi[i].offsetLeft, this.aLi[i].offsetTop, i]);
    }
    this.arr = arrA;
    // 随机
    let arr2 = [];
    for (let i = 0; i < this.len - 1; i++) {
        arr2.push(arr1[i]);
    }
    arr2.sort(function (a, b) {
        return Math.random() - 0.5;
    })
    arr2.push(arr1[this.len - 1])
    // 逆序数
    let arr3 = [];
    let a = 0;
    for (let i = 0; i < this.len; i++) {
        arr3.push(arr2[i][2]);
    }

    for (let i = 0; i < this.len; i++) {
        let b = arr3[i];
        for (let j = i; j < this.len; j++) {
            let c = arr3[j];
            if (b > c) {
                a += 1;
            }
        }
    }
    if (a % 2 === 0) {
        console.warn('Please start your show!');
    } else {
        console.warn("Unable to complete stitching.");
        this.ding();
        return false;  // 不再执行以下操作
    }

    arr1 = arr2;
    for (let i = 0; i < this.len; i++) {
        if(this.num > 3) {
            this.aLi[i].innerHTML = i+1;
            this.oLi.innerHTML = "";
        }
        this.aLi[i].style.position = 'absolute';
        this.aLi[i].style.left = arr1[i][0] + 'px';
        this.aLi[i].style.top = arr1[i][1] + 'px';
        this.aLi[i].index = arr1[i][2];
        this.aLi[i].style.margin = 0;
        this.aLi[i].style.backgroundSize = this.num * 100 + 'px';
        this.aLi[i].style.backgroundRepeat = 'no-repeat';
        this.aLi[i].style.backgroundPosition = (i % this.num) * -100 + 'px ' + ((i - (i % this.num)) / this.num) * -100 + 'px';
    }
}