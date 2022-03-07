export class Sheep {
    constructor(img, stageWidth) { //드로잉을 위한 이미지에셋, 양이 처음 등장할때 오른쪽 끝에서 등장
        this.img = img;

        this.totalFrame = 8; //sheep.png가 8프레임
        this.curFrame = 0; //현재프레임

        this.imgWidth = 360; //양 그림 한장이 넓이와 높이
        this.imgHeigt = 300;

        this.sheepWidth = 180; //그려질 양의크기 - 레티나 디스플레이 고려하여 절반으로
        this.sheepHeight = 150;

        this.sheepWidthHalf = this.sheepWidth / 2;
        this.x = stageWidth + this.sheepWidth;
        this.y = 0;
        this.speed = Math.random() * 2 + 1;

        this.fps = 24; //sheep.png를 그릴때 사용했던 fps로 설정
        this.fpsTime = 1000 / this.fps; //타임스탬프와 비교값

    }

    draw(ctx, t, dots) {
        if (!this.time) {
            this.time = t;
        }
        
        const now = t - this.time;
        if (now > this.fpsTime) { // 시간ㄴ을 내가정한 fps시간과 비교
            this.time = t;
            this.curFrame += 1; // 현재 프레임을 증가
            if (this.curFrame == this.totalFrame) {
                this.curFrame = 0;
            }
        }
 
        this.animate(ctx, dots);
    }

    animate(ctx, dots) {
        this.x = 650;
        this.y = 550;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = '#000000';
        // ctx.fillRect(
        //     -this.sheepWidthHalf,
        //     -this.sheepHeight + 20, //20: 그림에서 생기는 여백조절
        //     this.sheepWidth,
        //     this.sheepHeight
        // );

        ctx.drawImage(  // 캔버스에 이미지를 그릴땐 drawImage()함수 사용.
            this.img,
            this.imgWidth * this.curFrame,
            0,
            this.imgWidth,
            this.imgHeigt,
            -this.sheepWidthHalf,
            -this.sheepHeight + 20, //20: 그림에서 생기는 여백조절
            this.sheepWidth,
            this.sheepHeight
        );
        ctx.restore(); //회전시킬거라 저장했던 캔버스 복귀
    }

   

}