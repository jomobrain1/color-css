let pickbtn=document.getElementById("pick-btn")
// console.log(pickbtn);
let output=document.querySelector('.output')
let error=document.querySelector('.error')
let color=document.querySelector('.color')
let tip=localStorage.getItem('tool')
let tooltiptext=document.querySelector('.tooltiptext')
let count=0
window.onload=()=>{
    
    
    if(tip){
       tooltiptext.classList.add('hidden')
    }
}

pickbtn.onmouseover=()=>{
    count++    
    if(count>6){
        tooltiptext.classList.add('hidden')
    } 
   
    if(tip){
       tooltiptext.classList.add('hidden')
    }

  
}
pickbtn.onclick=()=>{
     localStorage.setItem('tool','tooltip')    
     
    if(!'EyeDropper' in window){
       error.textContent="Sorry Eye Dropper Not Supported in this browser"
       
    }
    const dropper= new EyeDropper()
    // Cancel the Eye dropper 
    const abortController=new AbortController()
    
     
    dropper.open({signal:abortController.signal})
    .then((response)=>{
      
        output.value=response.sRGBHex
        color.style.backgroundColor=response.sRGBHex
    }).catch(
        err=>{
            error.textContent=err
        }
    )
}

color.onclick=()=>{
    if(output.value==""){
        error.textContent="Input is empty"
    }else{
        error.textContent=""
        output.select();
        output.focus()
        output.setSelectionRange(0, 99999); 
        document.execCommand('copy');
        navigator.clipboard.writeText(output.value);
        pickbtn.textContent="Copied"
        pickbtn.classList.add('spin')
        setTimeout(()=>{
            pickbtn.textContent="pick"
        },5000)
        
    }
}

const container = document.querySelector(".pop-body");
const maxPaletteBoxes = 22;
const refreshBtn = document.querySelector(".refresh-btn");
refreshBtn.onclick=()=>{
    container.innerHTML=""
    for (let i = 0; i < maxPaletteBoxes; i++) {
        // generating a random hex color code
        let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
        randomHex = `#${randomHex.padStart(6, "0")}`;
         
        // console.log(randomHex);
        let generated=document.createElement('div')       
        generated.classList.add('generated')
        let generatedColor=document.createElement('div')
        generatedColor.classList.add('generated-color')
        generatedColor.style.backgroundColor=randomHex
        let generatedHex=document.createElement('input')
        generatedHex.classList.add('generated-hex')
        generatedHex.value=randomHex
        generated.append(generatedColor,generatedHex)
        container.append(generated)
         generatedColor.onclick=(e)=>{
            generatedColor.classList.remove('spin')
            let copyColor=e.target.nextSibling
            copyColor.select()
            copyColor.focus()
            document.execCommand('copy')
            generatedColor.textContent="Copied"
       
            generatedColor.classList.add('spin')
            output.value=generatedHex.value
            color.style.backgroundColor=generatedHex.value
            setTimeout(()=>{
                generatedColor.textContent=""
            },5000)
         }
        
    } 
}

