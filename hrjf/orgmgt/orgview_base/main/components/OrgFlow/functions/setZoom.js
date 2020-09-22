export default function setZoom(zoom) {
    const el = this.instance.getContainer(),
        p = ["webkit", "moz", "ms", "o"],
        s = "scale(" + zoom + ")",
        oString = "0% 0%";

    for (let i = 0; i < p.length; i++) {
        el.style[p[i] + "Transform"] = s;
        el.style[p[i] + "TransformOrigin"] = oString;
    }

    el.style["transform"] = s;
    el.style["transformOrigin"] = oString;

    this.instance.setZoom(zoom);
};