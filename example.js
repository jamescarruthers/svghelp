function svghelp_example() {

    // create a new SVG
    canvas = new SVGHelp(800, 600, 800, 600);
    // you can set attributes by accessing the svg variable
    canvas.svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    console.log(canvas.svg);

    // shapes take on default properties for stroke and fill (which are black)
    canvas.line(10, 10, 90, 90);
    console.log(canvas.last);

    // you can create groups
    canvas.openGroup();

    // you can change the stroke or fill by changing the default properties
    canvas.stroke.color = "red";
    canvas.line(90, 10, 10, 90);
    console.log(canvas.last);

    // you can reset stroke and fill back to default settings with reset()
    canvas.stroke.reset();
    canvas.fill.reset();
    canvas.line(10, 50, 90, 50);
    console.log(canvas.last);

    // shapes without properties inherit the groups properties
    canvas.stroke.color = "";
    canvas.line(50, 10, 50, 90);

    // closing a group adds it to the canvas
    canvas.closeGroup();
    console.log(canvas.last);

    // children of groups inherit any propertie that are not set
    canvas.stroke.color = "purple";
    canvas.stroke.width = 4;
    canvas.stroke.setAttributes(canvas.last);
    console.log(canvas.last);

    canvas.stroke.reset();

    // the shape functions return a reference
    newcircle = canvas.circle(25, 50, 50);
    newcircle.setAttribute("stroke", "rgb(255,0,0)");
    console.log(newcircle);

    // last refers to the last shape added, so you can manipulate it
    canvas.last.setAttribute("fill", "green");
    console.log(canvas.last);

    console.log(canvas.svg);

    // insert the SVG into the HTML
    document.body.appendChild(canvas.svg);

}


// if you want to animate something then add animate to some kind of event, such as onload

function animate() {
    setup();
    let fps = 30;
    setInterval(loop, 1000 / fps);
}


function setup() {

    canvas = new SVGHelp(800, 600, 800, 600);

    document.body.appendChild(canvas.svg);

}

x = 0;

function loop() {

    canvas.clear();

    x++;

    canvas.circle(Math.sin(Math.abs(x * 0.1)) * 25, x, 50);

}
