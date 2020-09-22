import {jsPlumb} from './jsplumb';

export default function createFlow() {
    this.instance = jsPlumb.getInstance({
        // notice the 'curviness' argument to this Bezier curve.  the curves on this page are far smoother
        // than the curves on the first demo, which use the default curviness value.
        /*Connector: [ "Bezier", { curviness: 50 } ],
        DragOptions: { cursor: "pointer", zIndex: 2000 },
        PaintStyle: { stroke: color, strokeWidth: 2 },
        EndpointStyle: { radius: 9, fill: color },
        HoverPaintStyle: {stroke: "#ec9f2e" },
        EndpointHoverStyle: {fill: "#ec9f2e" },*/
        Container: 'canvas'
    });

    this.instance.bind("click", (conn, originalEvent) => {
        originalEvent.stopPropagation();
        this.selectCon(conn);
    });

    /*this.instance.bind("connectionDrag", () => {
        console.log(arguments)
    });

    this.instance.bind("connectionDragStop", () => {
        console.log(arguments)
    });*/

    jsPlumb.fire("jsPlumbLoaded", this.instance);
}
