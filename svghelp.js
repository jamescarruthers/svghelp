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

    line(x1, y1, x2, y2) {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        this.stroke.setAttributes(line);
        return this.last = this.svg.appendChild(line);
    }

    polyline(points) {
        let polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        polyline.setAttribute("points", points);
        this.stroke.setAttributes(polyline);
        this.fill.setAttributes(polyline);
        return this.last = this.svg.appendChild(polyline);
    }

    polygon(points, stroke, fill) {
        let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute("points", points);
        this.stroke.setAttributes(polygon);
        this.fill.setAttributes(polygon);
        return this.last = this.svg.appendChild(polygon);
    }

    rect(x, y, w, h) {
        let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", w);
        rect.setAttribute("height", h);
        this.stroke.setAttributes(rect);
        this.fill.setAttributes(rect);
        return this.last = this.svg.appendChild(rect);
    }

    circle(r, x, y) {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("r", r);
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        this.stroke.setAttributes(circle);
        this.fill.setAttributes(circle);
        return this.last = this.svg.appendChild(circle);
    }

    ellipse(x, y, rx, ry) {
        let ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ellipse.setAttribute("cx", x);
        ellipse.setAttribute("cy", y);
        ellipse.setAttribute("rx", rx);
        ellipse.setAttribute("ry", ry);
        this.stroke.setAttributes(ellipse);
        this.fill.setAttributes(ellipse);
        return this.last = this.svg.appendChild(ellipse);
    }

    text(x, y, t) {
        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y);
        this.stroke.setAttributes(text);
        this.fill.setAttributes(text);
        this.text.appendChild(document.createTextNode(t));
        return this.last = this.svg.appendChild(text);
    }
}

