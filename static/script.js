// Drag and drop feature #######################################################################################################################    

class CircuitComponent{
    constructor(){
        this.x = 300;
        this.y = 400;
        this.element = document.createElement("div")
        this.element.classList.add("component")
        this.element.style.left = this.x + "px"
        this.element.style.top = this.y + "px"
        

    }
}

    function addComponent() {
        console.log("adding a new component...")
        let newComponent = new CircuitComponent()
        dropArea.appendChild(newComponent.element)
    }


    const dropArea = document.getElementById("drop-area")
    let newX = 0, newY = 0, startX = 0, startY = 0;
    const component = component.GetElementById('component');
    component.addEventListener('mousedown',Mousedown);

    function Mousedown(e){
        startX = e.clientX;
        startY = e.clientY;

        component.addEventListener('mousemove',Mousemove);
        component.addEventListener('mouseup',Mouseup);
        console.log('mousedown working')
    }

    function Mousemove(e){
        newX = startX - e.clientX;
        newY = startY - e.clientY;
        
        startX = e.clientX;
        startY = e.clientY;

        component.style.top = (component.offsetTop - newY) + 'px';
        component.style.left = (component.offsetLeft - newX) + 'px';

        console.log({newX,newY});
        console.log('mousemove working')
    }

    function Mouseup(e){
        component.removeEventListener('mousemove',Mousemove);
    }


// Spawning in new components #############################################################################################################

// function spawnComponent() {
//     const dropArea = document.getElementById('drop-area');

//     // Create a new component element
//     const newComponent = document.getElementById('Component').cloneNode(true);
//     newComponent.style.position = 'relative'; // Ensure the component is positioned relative to the container
//     newComponent.style.display = 'inline-block';

//     // Create a container for the component and its buttons
//     const componentContainer = document.createElement('div');
//     componentContainer.style.position = 'relative';
//     componentContainer.style.display = 'inline-block';
//     componentContainer.style.margin = '10px';

//     // Create the first button (left side)
//     const button1 = document.createElement('button');
//     button1.textContent = ''; // Optional: Add text or leave empty
//     button1.style.position = 'absolute';
//     button1.style.width = '30px';
//     button1.style.height = '30px';
//     button1.style.borderRadius = '50%'; // Make the button circular
//     button1.style.backgroundColor = '#007BFF'; // Optional: Set a background color
//     button1.style.left = '-40px'; // Position to the left of the component
//     button1.style.top = '50%'; // Center vertically
//     button1.style.transform = 'translateY(-50%)'; // Adjust for centering
//     button1.onclick = () => console.log('Button 1 clicked for this component');

//     // Create the second button (right side)
//     const button2 = document.createElement('button');
//     button2.textContent = ''; // Optional: Add text or leave empty
//     button2.style.position = 'absolute';
//     button2.style.width = '30px';
//     button2.style.height = '30px';
//     button2.style.borderRadius = '50%'; // Make the button circular
//     button2.style.backgroundColor = '#28A745'; // Optional: Set a background color
//     button2.style.right = '-40px'; // Position to the right of the component
//     button2.style.top = '50%'; // Center vertically
//     button2.style.transform = 'translateY(-50%)'; // Adjust for centering
//     button2.onclick = () => console.log('Button 2 clicked for this component');

//     // Append the component and buttons to the container
//     componentContainer.appendChild(button1);
//     componentContainer.appendChild(newComponent);
//     componentContainer.appendChild(button2);

//     // Append the container to the drop area
//     dropArea.appendChild(componentContainer);

//     // Log to the console
//     console.log("A new component has been spawned!");
// }

// Darkmode Script #######################################################################################################################
function toggleDarkMode() {
    const body = document.body; // Get the body element
    const button = document.getElementById('switch-dark-mode-button'); // Get the dark mode switch button
    body.classList.toggle('dark-mode'); // Toggle the 'dark-mode' class on the body element
    // Update the button text based on the current mode
    if (body.classList.contains('dark-mode')) {
    button.textContent = '☀︎';
    } else {
    button.textContent = '☽';
    }
}