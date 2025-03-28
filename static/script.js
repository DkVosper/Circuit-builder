class Circuit {
    constructor() {
      this.connections = [];
    }
  }
  
  class Component {
    constructor() {
      this.x = 300;
      this.y = 300;
  
      this.width = 50;
      this.height = 50;
  
      this.element = document.createElement("div");
      this.element.classList.add("component");
  
      this.element.style.left = this.x + "px";
      this.element.style.top = this.y + "px";



      this.element.addEventListener("mousedown", (event) =>
        this.handleClick(event)
      );
      this.element.addEventListener("dblclick", (event) =>
        this.deletenode(event)
      );

  
      circuitSpace.appendChild(this.element);
    }
  
    handleClick = (event) => {
      this.offsetX = event.clientX - this.x;
      this.offsetY = event.clientY - this.y;
      this.dragged = false;
      this.element.style.cursor = "grab"
      
      
      document.addEventListener("mousemove", this.drag);
      document.addEventListener("mouseup", this.mouseUp);
    };
  
    drag = (event) => {
      this.isConnecting = false;
      this.dragged = true;
      this.activeComponent = null;
      let newX = event.clientX - this.offsetX;
      let newY = event.clientY - this.offsetY;
  
      //validate positions
      if (newX > circuitSpace.clientWidth - this.width){
          newX = circuitSpace.clientWidth - this.width
      }

      if (newX < 0){
          newX = 0
      }

      if (newY > circuitSpace.clientHeight - this.height){
          newY = circuitSpace.clientHeight - this.height
      }
      
      if (newY < 0){
          newY = 0
      }


      this.x = newX;
      this.y = newY;

      // validation
      this.element.style.cursor = "grabbing"
      this.element.style.left = this.x + "px";
      this.element.style.top = this.y + "px";
      drawConnections();
    };
  
    mouseUp = () => {
      if (!this.dragged) {
        //hasn't been moved - indicated click to link
        console.log(this, "wants to connect");
        if (!from) {
          from = this;
        }
  
        if (!to && this !== from) {
          to = this;
          if (from && to) {
            buildConnection();
          }
        }
      }
    


      drawConnections();
      document.removeEventListener("mousemove", this.drag);
      document.removeEventListener("mouseup", this.mouseUp);
      document.removeEventListener("mouseup", this.deletenode);

    };

    deletenode = (event) => {
      console.log('deleting node');
      this.element.remove();
      // Remove connections associated with this component
      circuit.connections = circuit.connections.filter(
        ([comp1, comp2]) => comp1 !== this && comp2 !== this
      );
      drawConnections();
    };
  }
  
  class battery extends Component {
    constructor() {
      super();
  
      this.element.classList.add("battery");
  
      let hline1 = document.createElement("div");
      hline1.classList.add("battery-hline");
  
      let vlineTall1 = document.createElement("div");
      vlineTall1.classList.add("battery-vline-tall");
  
      let vlineShort1 = document.createElement("div");
      vlineShort1.classList.add("battery-vline-short");
  
      let hline2 = document.createElement("div");
      hline2.classList.add("battery-hline");
  
      let vlineTall2 = document.createElement("div");
      vlineTall2.classList.add("battery-vline-tall");
  
      let vlineShort2 = document.createElement("div");
      vlineShort2.classList.add("battery-vline-short");
      vlineShort2.style.marginRight = "0px"
  
      this.element.appendChild(hline1);
      this.element.appendChild(vlineTall1);
      this.element.appendChild(vlineShort1);
      this.element.appendChild(vlineTall2);
      this.element.appendChild(vlineShort2);
      this.element.appendChild(hline2);
    }
  }

  class voltmeter extends Component{
    constructor() {
        super();
        this.element.innerHTML = "V"
    }
  }

  class ammeter extends Component{
    constructor() {
        super();
        this.element.innerHTML = "A"
    }
  }

  class bulb extends Component{
    constructor() {
        super();
        this.element.innerHTML = "B"
    }
  }
  
  function addComponent(componentType) {
    let newComponent;
    if (componentType === "battery") {
      newComponent = new battery();
    }
    if (componentType === "voltmeter") {
      newComponent = new voltmeter();
    }
    if (componentType === "ammeter") {
      newComponent = new ammeter();
    }
    if (componentType === "bulb") {
      newComponent = new bulb();
    }
  }



  buildConnection = () => {
    //check to see if connected to self
    if (to === from) {
      //connecting to self
      alert("can't connect to self");
      from = null;
      to = null;
      return;
    }
  
    //check to see if already exists
    for (let pair of circuit.connections) {
      if (pair.includes(to) && pair.includes(from)) {
        alert("connection already exists");
        from = null;
        to = null;
        return;
      }
    }
  
    circuit.connections.push([from, to]);
    from = null;
    to = null;
    drawConnections();
  };
  
  drawConnections = () => {
    //Finds everything with the class of line.
    let oldLines = document.querySelectorAll(".line");
    //Goes through the list returned and removes them all.
    oldLines.forEach((line) => line.remove());
  
    //Goes through the connections and creates a line for each
    circuit.connections.forEach(([comp1, comp2]) => {
      //Create a new "Box" to act as a the line
      let line = document.createElement("div");
      //Applies the line class - sets things like absolute position, thickness of 2px, black fill
      line.classList.add("line");
  
      //Finds the co-ordinates of the two components being joined - offset by 25 for half node size
      let startX = comp1.x + 25;
      let startY = comp1.y + 25;
      // console.log('start x :', startX ,'start y :', startY)
      let endX = comp2.x + 25;
      let endY = comp2.y + 25;
      // console.log('end x :',endX ,'end y :', endY)
  
      //Work out the difference in terms of x and y between the components
      let a = endX - startX;
      let b = endY - startY;
      // console.log('x-distance:',a ,' y-distance :', b)
      //bit of pythag to work out the length the line needs to be
      let lineLength = Math.hypot(a, b);
      // console.log('Linelength:',lineLength)
      //Works out the rotation of the angle in RADIANS
      let rotation = (Math.atan2(b,a))
      // console.log(Math.atan2(b,a))
      // console.log('Rotation:',rotation)
      
  
      //places the line at the start x and y
      line.style.left = startX + "px";
      line.style.top = startY + "px";
      //Sets the width of the line to be the calculated line length.
      line.style.width = lineLength + "px";
  
      //Applies the transformation in radians
      line.style.transform = `rotate(${rotation}rad)`;
      //places the line into the circuit space
      circuitSpace.appendChild(line);
    });
  };
  
  //program code
  let from = null;
  let to = null;
  const circuitSpace = document.getElementById("drop-area");
  const circuit = new Circuit();
