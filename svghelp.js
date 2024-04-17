// colours should be defined as rgb(50,100,150), rgba, hsl etc

class Stroke {

    color = "black";
    width;
    opacity;
    linecap;
    dasharray;
    linejoin;

    constructor() {
    }

    reset() {
        this.color = "black";
        this.width = undefined;
        this.opacity = undefined;
        this.linecap = undefined;
        this.dasharray = undefined;
        this.linejoin = undefined;
    }

    setAttributes(object) {
        object.setAttribute("stroke", this.color);
        if (this.width != undefined) object.setAttribute("stroke-width", this.width);
        if (this.opacity != undefined) object.setAttribute("stroke-opacity", this.opacity);
        if (this.linecap != undefined) object.setAttribute("stroke-linecap", this.linecap);
        if (this.dasharray != undefined) object.setAttribute("stroke-dasharray", this.dasharray);
        if (this.linejoin != undefined) object.setAttribute("stroke-linejoin", this.linejoin);
        return object;
    }

}

class Fill {

    color = "black";
    opacity = undefined;
    rule = undefined;

    constructor() {
    }

    reset() {
        this.color = "black";
        this.opacity = undefined;
        this.rule = undefined;
    }

    setAttributes(object) {
        object.setAttribute("fill", this.color);
        if (this.opacity != undefined) object.setAttribute("fill-opacity", this.opacity);
        if (this.rule != undefined) object.setAttribute("fill-rule", this.rule);
        return object;
    }

}

class SVGHelp {

    stroke = new Stroke;
    fill = new Fill;
    svg;    // stores the svg that all the shape functions add to
    group;      // stores a group
    last;   // stores a reference to the last element added to the svg

    constructor(w, h, vw, vh) {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        if (w != "") svg.setAttribute("width", w);
        if (h != "") svg.setAttribute("height", h);
        if (vw && vh != "") svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);
        svg.setAttribute("version", "1.1");
        this.svg = svg;
    }

    clear() {
        this.svg.innerHTML = "";
    }

    openGroup() {
        this.group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    }

    closeGroup() {
        this.last = this.svg.appendChild(this.group);
        this.group = undefined;
        return this.last;
    }

    line(x1, y1, x2, y2) {
        let shape = document.createElementNS("http://www.w3.org/2000/svg", "line");
        shape.setAttribute("x1", x1);
        shape.setAttribute("y1", y1);
        shape.setAttribute("x2", x2);
        shape.setAttribute("y2", y2);
        this.stroke.setAttributes(shape);
        if (this.group == undefined) {
            return this.last = this.svg.appendChild(shape);
        } else {
            return this.last = this.group.appendChild(shape);
        }
        //return line;
    }

    polyline(points) {
        let shape = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        shape.setAttribute("points", points);
        this.stroke.setAttributes(shape);
        this.fill.setAttributes(shape);
        if (this.group == undefined) {
            return this.last = this.svg.appendChild(shape);
        } else {
            return this.last = this.group.appendChild(shape);
        }
    }

    polygon(points) {
        let shape = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        shape.setAttribute("points", points);
        this.stroke.setAttributes(shape);
        this.fill.setAttributes(shape);
        if (this.group == undefined) {
            return this.last = this.svg.appendChild(shape);
        } else {
            return this.last = this.group.appendChild(shape);
        }
    }

    rect(x, y, w, h) {
        let shape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        shape.setAttribute("x", x);
        shape.setAttribute("y", y);
        shape.setAttribute("width", w);
        shape.setAttribute("height", h);
        this.stroke.setAttributes(shape);
        this.fill.setAttributes(shape);
        if (this.group == undefined) {
            return this.last = this.svg.appendChild(shape);
        } else {
            return this.last = this.group.appendChild(shape);
        }
    }

    circle(r, x, y) {
        let shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        shape.setAttribute("r", r);
        shape.setAttribute("cx", x);
        shape.setAttribute("cy", y);
        this.stroke.setAttributes(shape);
        this.fill.setAttributes(shape);
        if (this.group == undefined) {
            return this.last = this.svg.appendChild(shape);
        } else {
            return this.last = this.group.appendChild(shape);
        }
    }

    ellipse(x, y, rx, ry) {
        let shape = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        shape.setAttribute("cx", x);
        shape.setAttribute("cy", y);
        shape.setAttribute("rx", rx);
        shape.setAttribute("ry", ry);
        this.stroke.setAttributes(shape);
        this.fill.setAttributes(shape);
        if (this.group == undefined) {
            return this.last = this.svg.appendChild(shape);
        } else {
            return this.last = this.group.appendChild(shape);
        }
    }

    text(x, y, t) {
        let shape = document.createElementNS("http://www.w3.org/2000/svg", "text");
        shape.setAttribute("x", x);
        shape.setAttribute("y", y);
        this.stroke.setAttributes(shape);
        this.fill.setAttributes(shape);
        this.shape.appendChild(document.createTextNode(t));
        if (this.group == undefined) {
            return this.last = this.svg.appendChild(shape);
        } else {
            return this.last = this.group.appendChild(shape);
        }
    }
}
