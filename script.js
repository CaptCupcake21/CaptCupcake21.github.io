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

    // Display Results
    document.getElementById("driveSpeed").textContent = `${driveSpeed.toFixed(2)} m/s`;
    document.getElementById("weaponRPM").textContent = `${weaponRPM.toFixed(2)} RPM`;
    document.getElementById("tipSpeed").textContent = `${tipSpeed.toFixed(2)} m/s`;
    document.getElementById("weaponKE").textContent = `${weaponKE.toFixed(2)} J`;
    document.getElementById("bite").textContent = `${bite.toFixed(2)} mm`;
}

// Assuming you have a button in your HTML to trigger this calculation:
document.getElementById("calculateResults").addEventListener("click", calculateResults);
