const systemVoltage = 3*4.2;
function calculateDrive(systemVoltage) {
    // Input values
    const motorKv = parseFloat(document.getElementById("motorKv").value);
    const gearing = parseFloat(document.getElementById("gearing").value);
    const wheelDiameter = parseFloat(document.getElementById("wheelDiameter").value); // in mm
    const coefficientOfFriction = parseFloat(document.getElementById("coefficientOfFriction").value);
    const robotWeight = parseFloat(document.getElementById("robotWeight").value); //in grams
    const maxCurrentDraw = parseFloat(document.getElementById("maxCurrentDraw").value); //in Amps

    
    // Constants
    const wheelDiameterInMeters = wheelDiameter/1000; // Convert diameter from mm to m
    const wheelRadius = wheelDiameter / 2; // Convert diameter in mm to radius in mm
    const gravity = 9.80665; //Gravitational Constant
    
    // Calculations (Simplified)
    const maxPowerDraw = systemVoltage * maxCurrentDraw; //in Watts
    const rpm = motorKv * systemVoltage; // Assuming a 7.4V battery, adjust as necessary
    const rpm_rad = rpm * (2*Math.PI)/60;
    const robotSpeed = ((rpm / gearing) * wheelRadius); // Speed in meters per minute, converted to m/s
    const torque = (maxPowerDraw / rpm_rad) / gearing; // Simplified torque calculation
    const maxPushingForce = coefficientOfFriction * robotWeight * 9.81; // Simplified pushing force calculation

    // Output values
    document.getElementById("torque").value = torque.toFixed(2);
    document.getElementById("rpm").value = (rpm / gearing).toFixed(0);
    document.getElementById("robotSpeed").value = (robotSpeed / 60).toFixed(2);
    document.getElementById("maxPushingForce").value = maxPushingForce.toFixed(2);
}
