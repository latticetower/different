var height = 20;
var width = 20;
 
function make_simple_line(
        start, length=10) {
    var path = new Path();
    path.strokeColor = 'red';
    path.moveTo(start);
    path.lineTo(start+[0, length*2*height]);
    //path.lineTo();
}

function* get_points(start, lborder, rborder, direction="right", max_points=10) {
    if (max_points == 0) return;
    console.log(max_points, direction)
    if (direction == "right") {
        diff = rborder.x - start.x;
        steps = diff/width;
        console.log(steps,  max_points);
        if (steps >= max_points) {
            for (let i = 0; i < max_points; i++) {
                yield start + [width*i, height*i];
            }
            return;
        }
        else {
            last = start;
            for (let i = 0; i< steps; i++){
                last += [width, height];
                yield last;
            }
            rem = get_points(last, lborder, rborder, direction="left",
                max_points=max_points - steps);
            
            for (let p of rem){
                yield p;
            }
            return;
        }
        
    }
    else {
        diff = start.x - lborder.x;
        steps = diff/width;
        console.log(direction, max_points, steps);
        if (steps >= max_points) {
            console.log(direction, max_points);
            for (let i = 0; i < max_points; i++) {
                
                yield start + [-width*i, height*i];
                
            }
            return;
        }
        else {
            last = start;
            for (let i = 0; i< steps; i++){
                last += [-width, height];
                yield last;
            }
            rem = get_points(last, lborder, rborder, direction="right", max_points=max_points-steps)
            for (let p of rem){
                console.log(p);
                yield p;
            }
        }
    }
    //return;   
}
function make_diag_line(
        start, lborder, rborder,
        direction="right", length=10) {
    var path = new Path();
    path.strokeColor = 'black';
    path.moveTo(start);
    total_steps = 0;
    
    points = get_points(start, lborder, rborder, direction=direction, max_points=length)
    for (let p of points) {
        path.lineTo(p);
    }
    //path.lineTo();
}
var path = new Path();
// Give the stroke a color
path.strokeColor = 'black';
var start = new Point(100, 100);
// Move to start and draw a line from there
path.moveTo(start);
// Note the plus operator on Point objects.
// PaperScript does that for us, and much more!
path.lineTo(start + [ 0, 10.5 ]);
//console.log(start + [ 0, 10.5 ]);
function draw_lattice(start, width_units, length) {
    var left_point=start;
    var right_point = start+[width*2*width_units, 0];
    make_simple_line(left_point, 10, type="simple", length=length);
    make_simple_line(left_point+[width/2.0, 0], 10, type="simple", length=length);
    make_simple_line(right_point, 10, type="simple", length=length);
    make_simple_line(right_point+[-width/2.0, 0], 10, type="simple", length=length);
    
    //make_diag_line(start, left_point, right_point);
    for (let i=1; i < width_units; i++){
        make_diag_line(start + [i*2*width, 0], left_point, right_point,
            direction="right", length=length);
        make_diag_line(start + [i*2*width, 0], left_point, right_point,
            direction="left", length=length);
    }
    make_diag_line(start + [0*width, 0], left_point, right_point,
            direction="right", length=length);
    make_diag_line(start + [width_units*2*width, 0], left_point, right_point,
            direction="left", length=length);
}
draw_lattice(start, 10, 20);
console.log("sss")
