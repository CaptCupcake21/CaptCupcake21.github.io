function convertUnits() {
    console.log("calculateResults function is called.");
    const unitType = document.getElementById('units').value;
    const wheelDiameterInput = document.getElementById('wheelDiameter');
    const weaponRadiusInput = document.getElementById('weaponRadius');
    const momentOfInertiaInput = document.getElementById('momentOfInertia');
    
    // Conversion factors
    const mmToInches = 0.0393701;
    const gMm2ToLbFt2 = 2.20462e-6 * 0.000001;
    
    if (unitType === 'english') {
        // Convert to English units
        wheelDiameterInput.value = (wheelDiameterInput.value * mmToInches).toFixed(2);
        weaponRadiusInput.value = (weaponRadiusInput.value * mmToInches).toFixed(2);
        momentOfInertiaInput.value = (momentOfInertiaInput.value * gMm2ToLbFt2).toFixed(6);
    } else {
        // Convert to Metric units
        wheelDiameterInput.value = (wheelDiameterInput.value / mmToInches).toFixed(2);
        weaponRadiusInput.value = (weaponRadiusInput.value / mmToInches).toFixed(2);
        momentOfInertiaInput.value = (momentOfInertiaInput.value / gMm2ToLbFt2).toFixed(2);
    }
}

function calculateResults() {
    // Constants
    const cellVoltage = 3.7;
    const pi = 3.141592653589793238;

    // Power Inputs
    const cellCount = parseInt(document.getElementById("cellCount").value, 10);

    // Drive Inputs
    const wheelDiameter = parseFloat(document.getElementById("wheelDiameter").value);
    const driveMotorRPM = parseInt(document.getElementById("driveMotorRPM").value);
    const driveThrottlePercent = parseFloat(document.getElementById("driveThrottlePercent").value) / 100; // Convert percentage to decimal
    const driveGearing = parseFloat(document.getElementById("driveGearing").value);

    // Weapon Inputs
    const weaponMotorKv = parseInt(document.getElementById("weaponMotorKv").value, 10);
    const weaponRadius = parseFloat(document.getElementById("weaponRadius").value);
    const numImpactors = parseInt(document.getElementById("numImpactors").value, 10);
    const momentOfInertia = parseFloat(document.getElementById("momentOfInertia").value);
    const weaponGearing = parseFloat(document.getElementById("weaponGearing").value);
    const weaponThrottlePercent = parseFloat(document.getElementById("weaponThrottlePercent").value) / 100; // Convert percentage to decimal

    // General Calculations
    const systemVoltage = cellCount * cellVoltage;

    // Drive Calculations
    const driveMotorRPM_Rad = driveMotorRPM * ((2 * pi) / 60);
    const wheelRadius = wheelDiameter / 2 / 1000;
    const driveSpeed = (driveMotorRPM_Rad / driveGearing) * wheelRadius;

    // Weapon Calculations
    const weaponMotorRPM = weaponMotorKv * systemVoltage;
    const weaponMotorRPM_Rad = weaponMotorRPM * ((2 * pi) / 60);
    const weaponRPM = weaponMotorRPM / weaponGearing;
    const weaponRPM_Rad = weaponMotorRPM_Rad / weaponGearing;
    const weaponRadiusInM = weaponRadius / 1000;
    const tipSpeed = weaponRPM_Rad * weaponRadiusInM;
    const weaponKE = 0.5 * momentOfInertia * 1e-9 * (weaponRPM_Rad ** 2); // Convert g*mm^2 to kg*m^2
    const biteTime = (2 * pi) / (numImpactors * weaponRPM_Rad);
    const bite = driveSpeed * biteTime * 1000; // Convert to mm

    // Conversion factors
    const mToFeet = 3.28084;
    const jToFtLbs = 0.737562;

    // Display Results
    document.getElementById("driveSpeed").textContent = `Drive Speed: ${driveSpeed.toFixed(2)} m/s (${(driveSpeed * mToFeet).toFixed(2)} ft/s)`;
    document.getElementById("weaponRPM").textContent = `Weapon RPM: ${weaponRPM.toFixed(2)} RPM`;
    document.getElementById("tipSpeed").textContent = `Tip Speed: ${tipSpeed.toFixed(2)} m/s (${(tipSpeed * mToFeet).toFixed(2)} ft/s)`;
    document.getElementById("weaponKE").textContent = `Weapon KE: ${weaponKE.toFixed(2)} J (${(weaponKE * jToFtLbs).toFixed(2)} ft·lbs)`;
    document.getElementById("bite").textContent = `Bite: ${bite.toFixed(2)} mm (${(bite * mmToInches).toFixed(2)} inches)`;
}
