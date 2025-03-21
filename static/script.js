// Drag and drop feature #######################################################################################################################    

class Circuit {
    constructor() {
        this.components = []
    }

    addComponent = (newComponent) => {
        this.components.push(
            {
                gate:newComponent,
                connectedTo: null
            })
        console.log(this.components)
    }
}


class CircuitComponent{
    constructor(){
        this.x = 300;
        this.y = 400;
        this.width = 50;
        this.height = 50;
        this.element = document.createElement("div")
        this.element.classList.add("component")
        this.element.style.left = this.x + "px"
        this.element.style.top = this.y + "px"
        
        this.element.addEventListener("mousedown", (event) => this.startDrag(event))

    }

    startDrag = (event) => {
        console.log("Drag started")
        this.offsetX = event.clientX - this.element.offsetLeft
        this.offsetY = event.clientY - this.element.offsetTop
        this.element.style.cursor = "grabbing"

        document.addEventListener("mousemove", this.drag)
        document.addEventListener("mouseup", this.stopDrag)

    }


    drag = (event) => {
        let newX = event.clientX - this.offsetX
        let newY = event.clientY - this.offsetY

        


        //validate positions
        if (newX > dropArea.clientWidth - this.width){
            newX = dropArea.clientWidth - this.width
        }

        if (newX < 0){
            newX = 0
        }

        if (newY > dropArea.clientHeight - this.height){
            newY = dropArea.clientHeight - this.height
        }
        
        if (newY < 0){
            newY = 0
        }
    



        this.x = newX
        this.y = newY
        this.element.style.left = this.x + "px"
        this.element.style.top = this.y + "px"
    }

    stopDrag = () =>{
        console.log("stopping drag....")
        
        this.element.style.cursor = "grab"
        document.removeEventListener("mousemove", this.drag)
        document.removeEventListener("mouseup", this.stopDrag)
    }
}


class Battery extends CircuitComponent{
    constructor() {
        super()
        this.element.innerHTML = "B"
        this.element.style.backgroundImage = "{{url_for('static', filename='battery.png')}}"
    }
}

class Voltmeter extends CircuitComponent{
    constructor() {
        super()
        this.element.innerHTML = "V"
        this.element.style.backgroundImage = "{{url_for('static', filename='Voltmeter.png')}}"
    }
}

class Bulb extends CircuitComponent{
    constructor() {
        super()
        this.element.innerHTML = "X"
        this.element.style.backgroundImage = "{{url_for('static', filename='Voltmeter.png')}}"
    }
}

class Ammeter extends CircuitComponent{
    constructor() {
        super()
        this.element.innerHTML = "A"
        this.element.style.backgroundImage = "{{url_for('static', filename='Voltmeter.png')}}"
    }
}


    function addComponent(componentType) {
        console.log("adding a new component...")
        console.log(componentType)
        if (componentType === "battery"){
            var newComponent = new Battery()
        }
        if (componentType === "ammeter"){
            var newComponent = new Ammeter()
        }
        if (componentType === "voltmeter"){
            var newComponent = new Voltmeter()
        }
        if (componentType === "bulb"){
            var newComponent = new Bulb()
        }
        dropArea.appendChild(newComponent.element)
        circuit.addComponent(newComponent)

    }



    let newX = 0, newY = 0, startX = 0, startY = 0;
// const component = component.GetElementById('component');
// component.addEventListener('mousedown',Mousedown);
const dropArea = document.getElementById("drop-area")
const circuit = new Circuit()

    
//     function Mousedown(e){
//         startX = e.clientX;
//         startY = e.clientY;
        
//         component.addEventListener('mousemove',Mousemove);
//         component.addEventListener('mouseup',Mouseup);
//         console.log('mousedown working')
//     }
    
//     function Mousemove(e){
//         newX = startX - e.clientX;
//         newY = startY - e.clientY;
        
//         startX = e.clientX;
//         startY = e.clientY;
        
//         component.style.top = (component.offsetTop - newY) + 'px';
//         component.style.left = (component.offsetLeft - newX) + 'px';
        
//         console.log({newX,newY});
//         console.log('mousemove working')
//     }

//     function Mouseup(e){
//         component.removeEventListener('mousemove',Mousemove);
//     }

    
// // Darkmode Script #######################################################################################################################
// function toggleDarkMode() {
//     const body = document.body; // Get the body element
//     const button = document.getElementById('switch-dark-mode-button'); // Get the dark mode switch button
//     body.classList.toggle('dark-mode'); // Toggle the 'dark-mode' class on the body element
//     // Update the button text based on the current mode
//     if (body.classList.contains('dark-mode')) {
//         button.textContent = '☀︎';
//     } else {
//         button.textContent = '☽';
//     }
// }



