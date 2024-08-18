function calculateResults() {
    // Constants
    const cellVoltage = 3.7; // V
    const gravity = 9.81; // m/s^2
    const pi = 3.141592653589793238;

    // Power Inputs
    const cellCount = parseInt(document.getElementById("cellCount").value, 10);
    
    // Drive Inputs
    let wheelDiameter = parseFloat(document.getElementById("wheelDiameter").value);
    const driveMotorRPM = parseInt(document.getElementById("driveMotorRPM").value);
    const driveThrottlePercent = parseFloat(document.getElementById("driveThrottlePercent").value) / 100; // Convert percentage to decimal
    const driveGearing = parseFloat(document.getElementById("driveGearing").value);

    // Weapon Inputs
    const weaponMotorKv = parseInt(document.getElementById("weaponMotorKv").value, 10);
    let weaponRadius = parseFloat(document.getElementById("weaponRadius").value);
    const numImpactors = parseInt(document.getElementById("numImpactors").value, 10);
    let momentOfInertia = parseFloat(document.getElementById("momentOfInertia").value);
    const weaponGearing = parseFloat(document.getElementById("weaponGearing").value);
    const weaponThrottlePercent = parseFloat(document.getElementById("weaponThrottlePercent").value) / 100; // Convert percentage to decimal

    // General Calculations
    const systemVoltage = cellCount * cellVoltage;
    const robotMass = parseFloat(document.getElementById("robotMass").value) / 1000; //convert g to kg
    const unitType = document.getElementById('units').value;
    const distBetweenWheels = parseFloat(document.getElementById("distBetweenWheels").value);
    if (unitType === 'english') {
        // Convert wheel diameter and weapon radius to metric
        wheelDiameter *= 25.4; // Convert inches to mm
        weaponRadius *= 25.4; // Convert inches to mm
        momentOfInertia *= 18289.978313; //convert ozin^2 to gmm^2
        robotMass *= 1/35.274; //convert oz to kg
        distBetweenWheels *= 25.4; //convert inches to mm
        momentOfInertia *= 1e-9; //convert gmm^2 to kgm^2
    }

    // Drive Calculations
    const driveMotorRPM_Rad = driveMotorRPM * ((2 * pi) / 60);
    const wheelRadius = (wheelDiameter / 2) / 1000;
    const driveSpeed = ((driveMotorRPM_Rad * driveGearing) * wheelRadius)*driveThrottlePercent;

    // Weapon Calculations
    const weaponMotorRPM = weaponMotorKv * systemVoltage * weaponThrottlePercent;
    const weaponMotorRPM_Rad = weaponMotorRPM * ((2 * pi) / 60);
    const weaponRPM = weaponMotorRPM * weaponGearing;
    const weaponRPM_Rad = weaponMotorRPM_Rad * weaponGearing;
    const weaponRadiusInM = weaponRadius / 1000;
    const tipSpeed = weaponRPM_Rad * weaponRadiusInM;
    const weaponKE = 0.5 * momentOfInertia * (weaponRPM_Rad ** 2); 
    const biteTime = (2 * pi) / (numImpactors * weaponRPM_Rad);
    const bite = driveSpeed * biteTime * 1000; // Convert to mm

    // Gyro Calculations
    const tipMoment = (distBetweenWheels ** 2) * (robotMass * gravity); // M = (L^2)(m*g)
    const maxTurnSpeed = tipMoment/(weaponRPM_Rad*momentOfInertia); // w_bot = M/(I*w_wep)
    const maxDriveSpeed = maxTurnSpeed * (distBetweenWheels/2); // V = w_bot/(L/2)
    const maxFlatTurnRate = (maxDriveSpeed / ((driveMotorRPM_Rad * driveGearing) * wheelRadius))*100; // (V/Vmax)*100 
    
    // Conversion factors
    const mToFeet = 3.28084;
    const jToFtLbs = 0.737562;
    const mmToInches = 0.039370;
    const msToMPH = 2.236936;

    // Display Results
    document.getElementById("driveSpeed").textContent = `Drive Speed: ${driveSpeed.toFixed(2)} m/s (${(driveSpeed * mToFeet).toFixed(2)} ft/s)`;
    document.getElementById("maxFlatTurnRate").textContent = `Max Flat Turn Rate: ${maxFlatTurnRate.toFixed(2)} %`;
    document.getElementById("weaponRPM").textContent = `Weapon RPM: ${weaponRPM.toFixed(2)} RPM`;
    document.getElementById("tipSpeed").textContent = `Tip Speed: ${tipSpeed.toFixed(2)} m/s (${(tipSpeed * msToMPH).toFixed(2)} MPH)`;
    document.getElementById("weaponKE").textContent = `Weapon KE: ${weaponKE.toFixed(2)} J (${(weaponKE * jToFtLbs).toFixed(2)} ft·lbs)`;
    document.getElementById("bite").textContent = `Bite: ${bite.toFixed(2)} mm (${(bite * mmToInches).toFixed(2)} inches)`;
}
