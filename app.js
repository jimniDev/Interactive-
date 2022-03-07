import {
    Hill
} from './hill.js';

import {
    Sheepcontroller
} from './sheep-controller.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.hills = [
            new Hill('#fd6bea', 0.2, 12),
            new Hill('#ff59c2', 0.5, 8),
            new Hill('#ff4674', 1.4, 6)
        ];

        this.sheepcontroller = new Sheepcontroller(); 

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();


        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2; // for clear view on retina display
        this.canvas.height = this.stageHeight *2;
        this.ctx.scale(2, 2);

        for (let i=0; i<this.hills.length; i++){
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }

        this.sheepcontroller.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        let dots;
        for (let i=0; i<this.hills.length; i++){
            dots = this.hills[i].draw(this.ctx);
        }
        
        // 마지막 언덕의 좌표에서 양을 그릴거니까, hill 클래스에서 리턴값으로 받은 언덕들의 좌표(dota)를 sheepController 에 넘겨주고
        // Fps를 위한 타임스탬프(t)를 파라미터로 넘김
        this.sheepcontroller.draw(this.ctx, t, dots)

        //requestAnimationFram 함수는 타임스태프를 파라미터로 넘겨받음 -> 이걸 통해 FPS 정의 가능
        

    }
}

window.onload = () => {
    new App();
}