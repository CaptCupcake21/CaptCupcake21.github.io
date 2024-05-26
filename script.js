function calculateResults() {
    // Constants
    const cellVoltage = 3.7;
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

    const unitType = document.getElementById('units').value;
    if (unitType === 'english') {
        // Convert wheel diameter and weapon radius to metric
        wheelDiameter *= 25.4; // Convert inches to mm
        weaponRadius *= 25.4; // Convert inches to mm
        momentofInertia *= 18289.978313; //convert ozin^2 to gmm^2
    }

    // Drive Calculations
    const driveMotorRPM_Rad = driveMotorRPM * ((2 * pi) / 60);
    const wheelRadius = (wheelDiameter / 2) / 1000;
    const driveSpeed = (driveMotorRPM_Rad * driveGearing) * wheelRadius;

    // Weapon Calculations
    const weaponMotorRPM = weaponMotorKv * systemVoltage;
    const weaponMotorRPM_Rad = weaponMotorRPM * ((2 * pi) / 60);
    const weaponRPM = weaponMotorRPM * weaponGearing;
    const weaponRPM_Rad = weaponMotorRPM_Rad * weaponGearing;
    const weaponRadiusInM = weaponRadius / 1000;
    const tipSpeed = weaponRPM_Rad * weaponRadiusInM;
    const weaponKE = 0.5 * momentOfInertia * 1e-9 * (weaponRPM_Rad ** 2); // Convert g*mm^2 to kg*m^2
    const biteTime = (2 * pi) / (numImpactors * weaponRPM_Rad);
    const bite = driveSpeed * biteTime * 1000; // Convert to mm

    // Conversion factors
    const mToFeet = 3.28084;
    const jToFtLbs = 0.737562;
    const mmToInches = 0.039370;
    const msToMPH = 2.236936;

    // Display Results
    document.getElementById("driveSpeed").textContent = `Drive Speed: ${driveSpeed.toFixed(2)} m/s (${(driveSpeed * mToFeet).toFixed(2)} ft/s)`;
    document.getElementById("weaponRPM").textContent = `Weapon RPM: ${weaponRPM.toFixed(2)} RPM`;
    document.getElementById("tipSpeed").textContent = `Tip Speed: ${tipSpeed.toFixed(2)} m/s (${(tipSpeed * msToMPH).toFixed(2)} MPH)`;
    document.getElementById("weaponKE").textContent = `Weapon KE: ${weaponKE.toFixed(2)} J (${(weaponKE * jToFtLbs).toFixed(2)} ft·lbs)`;
    document.getElementById("bite").textContent = `Bite: ${bite.toFixed(2)} mm (${(bite * mmToInches).toFixed(2)} inches)`;
}
