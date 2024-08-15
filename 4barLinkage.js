function solveLinkage() {
    let a = parseFloat(document.getElementById('length1').value);
    let b = parseFloat(document.getElementById('length2').value);
    let c = parseFloat(document.getElementById('length3').value);
    let d = parseFloat(document.getElementById('length4').value);
    let th2 = parseFloat(document.getElementById('angle').value) * (Math.PI / 180);

    // k Parameters
    let k1 = d/a;
    let k2 = d/c;
    let k3 = (a^2 - b^2 + c^2 - d^2)/(2*a*c);
    let k4 = d/b;
    let k5 = (c^2 - d^2 - a^2 - b^2)/(2*a*b);

    // Define A-F Terms
    let A = Math.cos(th2) - k1 - k2*Math.cos(th2) + k3;
    let B = -2 * Math.sin(th2);
    let C = k1 - (k2 + 1)*Math.cos(th2) + k3;
    let D = Math.cos(th2) - k1 + k4*Math.cos(th2) + k5;
    let E = -2 * Math.sin(th2);
    let F = k1 + (k4 - 1)*Math.cos(th2) + k5;
    
    //Compute the Discriminants for Theta 3 to Determine if Values are Real
    let th3_d =  (-E + (E^2 - 4*D*F))^0.5;
    let th3p_d = (-E - (E^2 - 4*D*F))^0.5;
    let th4_d = (-B + (B^2 - 4*A*C))^0.5;
    let th4p_d = (-B - (B^2 - 4*A*C))^0.5;

    //Find Solutions for th3 and th4
    let th3 = 2*Math.atan(th3_d/(2*D)) * (180/Math.PI);
    let th3p = 2*Math.atan(th3p_d/(2*D)) * (180/Math.PI);
    let th4 = 2*Math.atan(th4_d/(2*A)) * (180/Math.PI);
    let th4p = 2*Math.atan(th4p_d/(2*A)) * (180/Math.PI);

    //Determine if th3 and th3p are Real Values
    let th3_real;
    let th3p_real;
    if(th3_d >= 0){
        th3_real = 1;
    }
    if(th3_d < 0){
        th3_real = 0;
    }

    if(th3p_d >= 0){
        th3p_real = 1;
    }
    if(th3p_d < 0){
        th3p_real = 0;
    }

    //Determine if System is Crossed & Open
    let th3_open;
    let th4_open;
    let th3_crossed;
    let th4_crossed;
    if((th3 != th3p) && (th3_real == 1) && (th3p_real == 1)){
        th3_open = th3p;
        th4_open = th4p;
        th3_crossed = th3;
        th4_crossed = th4;
    }

    //Determine if System has Only One Configuration

    if((th3 == th3p) && ((th3_real == 1 && th3p_real != 1) || (th3_real != 1 && th3p_real == 1))){
        
    }

    //Determine if There are No Possible Configurations
    if(th3_real != 1 && th3p != 1){
    
    }
       
}






