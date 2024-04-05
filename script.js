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
    const robotWeightInKg = robotWeight / 1000;
    
    // Calculations (Simplified)
    const maxPowerDraw = systemVoltage * maxCurrentDraw; //in Watts
    const rpm = motorKv * systemVoltage; // Assuming a 7.4V battery, adjust as necessary
    const rpm_rad = rpm * (2*Math.PI)/60;
    const robotSpeed = ((rpm / gearing) * wheelRadius); // Speed in meters per minute, converted to m/s
    const torque = (maxPowerDraw / rpm_rad) / gearing; // Simplified torque calculation
    const maxPushingForce = coefficientOfFriction * robotWeightInKg * 9.81; // Simplified pushing force calculation

    // Output values
    document.getElementById("torque").value = torque.toFixed(2);
    document.getElementById("rpm").value = (rpm / gearing).toFixed(0);
    document.getElementById("robotSpeed").value = (robotSpeed / 60).toFixed(2);
    document.getElementById("maxPushingForce").value = maxPushingForce.toFixed(2);
}

function calculateWeapon(systemVoltage) {
    // Input values
    const weapon_motorKv = parseFloat(document.getElementById("motorKv").value);
    const weapon_gearing = parseFloat(document.getElementById("gearing").value);
    const weaponDiameter = parseFloat(document.getElementById("weaponDiameter").value); // in mm
    const maxCurrentDraw = parseFloat(document.getElementById("maxCurrentDraw").value); //in Amps
    const momentOfInertia = parseFloat(document.getElementById("momentOfInertia").value); //in g*mm^2
    const weaponWeight = parseFloat(document.getElementById("weaponWeight").value); //in g

    
    // Constants
    const weaponDiameterInMeters = weaponDiameter/1000; // Convert diameter from mm to m
    const weaponRadius = weaponDiameter / 2; // Convert diameter in m to radius in m
    const weaponWeightInKg = weaponWeight / 1000;
    
    // Calculations (Simplified)
    const maxPowerDraw = systemVoltage * maxCurrentDraw; //in Watts
    const weapon_rpm = motorKv * systemVoltage; // Theoretical Weapon RPM
    const weapon_rpm_rad = rpm * (2*Math.PI)/60; // Convert RPM to rad/s for ease of calculation
    const tipSpeed = ((rpm / gearing) * weaponRadius); // Effective Tip Speed
    const torque = (maxPowerDraw / rpm_rad) / gearing; // Effective Torque at End of Weapon
    const kineticEnergy = 0.5 * momentOfInertia * (weapon_rpm_rad**2); // Kinetic Energy of Weapon in Joules

    // Output values
    document.getElementById("tipSpeed").value = tipSpeed.toFixed(2);
    document.getElementById("weapon_rpm").value = weapon_rpm.toFixed(0);
    document.getElementById("torque").value = torque.toFixed(2);
    document.getElementById("kineticEnergy").value = kineticEnergy.toFixed(2);
}
