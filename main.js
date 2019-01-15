var canvas = document.querySelector('canvas')
    ;
//makes canvas full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//context
var c = canvas.getContext('2d');
//square

// c.fillStyle = "blue";
// c.fillRect(100,100,100,100);
// c.fillStyle = 'rgba(220, 200, 140, 55)';
// c.fillRect(500,400,100,100);
// c.fillRect(200,300,100,100);
// c.fillStyle = "blue";
// c.fillRect(600,200,100,100);
// console.log('canvas');

// lines

// c.beginPath();
// c.moveTo(400, 600);
// c.lineTo(500, 200);
// c.lineTo(200, 600);
// c.strokeStyle = "green"
// c.stroke();

// arc / circle

// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// for (var i = 0; i < 30; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = getRandomColor();
//     c.stroke();
// }

// for (var i = 0; i < 30; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.fillStyle = getRandomColor();
//     c.fillRect(x, y, 10, 10);
//     console.log('canvas');
// }

// for (var i = 0; i < 30; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.moveTo(100, 100);
//     c.lineTo(x, y);
//     c.lineTo(x, y);
//     c.strokeStyle = getRandomColor();
//     c.stroke();
// }

// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }
// function setRandomColor() {
//     $("#colorpad").css("background-color", getRandomColor());
//   }


//this refers to the global object within a funtion


//px



function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'blue';
        c.fill();
        c.stroke();
    }

    this.update = function() {

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // player hit
        if ((player.x < this.x + this.radius && player.x > this.x - this.radius)
            && (player.y < this.y + this.radius && player.y > this.y - this.radius)) {
                player.x = -100;                
                player.y = -100;                
                alert('Game Over!');
            }
        
        this.draw();
    }

}

const player = { x: -100, y: -100 };
document.addEventListener('mousemove', (e) => { player.x = e.x; player.y = e.y; });


//to check if its within the square 
//has to be within the square
//the event.clientX >= circleArray[i].x && event.clientX <= circleArray[i].x
//    event.clientY >= circleArray[i].y && event.clientY <= circleArray[i].y
// if event.clientX >= circleArray[i].x && event.clientX <= circleArray[i].x
//    event.clientY >= circleArray[i].y && event.clientY <= circleArray[i].y
//    clear circleArray[i]
//else
//    do nothing

/*
circleArray[i] = Circle = {
    x:x,
    y:y,
    r:r,
}
*/
var circleArray = [];

for (var i = 0; i < 100; i++) {
    var radius = 10;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 5;
    var dy = (Math.random() - 0.5) * 5;
    circleArray.push(new Circle(x, y, dx, dy, radius));
    //if it is within 50px of square delete 
}
//Math.random() *innerHeight

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}

animate();



