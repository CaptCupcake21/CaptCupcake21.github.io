function calculateResults() {
    // Constants
    const cellVoltage = 3.7;
    const pi = 3.141592653589793238;
    const mmToInch = 0.0393701;
    const gmm2ToOzin2 = 1.41612e-5;

    // Power Inputs
    const cellCount = parseInt(document.getElementById("cellCount").value, 10);
    }

    // Drive Inputs
    let wheelDiameter = parseFloat(document.getElementById("wheelDiameter").value);
    const wheelDiameterUnit = document.getElementById("wheelDiameterUnit").value;
    const driveMotorRPM = parseInt(document.getElementById("driveMotorRPM").value, 10);
    const driveThrottlePercent = parseFloat(document.getElementById("driveThrottlePercent").value) / 100;
    const driveGearing = parseFloat(document.getElementById("driveGearing").value);

    if (wheelDiameterUnit === "inch") {
        // Convert inches to millimeters for wheel diameter
        wheelDiameter /= mmToInch;
    }


    // Weapon Inputs
    const weaponMotorKv = parseInt(document.getElementById("weaponMotorKv").value, 10);
    let weaponRadius = parseFloat(document.getElementById("weaponRadius").value);
    const weaponRadiusUnit = document.getElementById("weaponRadiusUnit").value;
    const numImpactors = parseInt(document.getElementById("numImpactors").value, 10);
    let momentOfInertia = parseFloat(document.getElementById("momentOfInertia").value);
    const momentOfInertiaUnit = document.getElementById("momentOfInertiaUnit").value;
    const weaponGearing = parseFloat(document.getElementById("weaponGearing").value);
    const weaponThrottlePercent = parseFloat(document.getElementById("weaponThrottlePercent").value) / 100;

    if (weaponRadiusUnit === "inch") {
        // Convert inches to millimeters for weapon radius
        weaponRadius /= mmToInch;
    }

    if (momentOfInertiaUnit === "ozin^2") {
        // Convert oz*in^2 to g*mm^2 for moment of inertia
        momentOfInertia /= gmm2ToOzin2;
    }


    // General Calculations
    const systemVoltage = cellCount * cellVoltage;

    // Drive Calculations
    const driveMotorRPM_Rad = driveMotorRPM * ((2 * pi) / 60);
    const wheelRadius = wheelDiameter / 2 / 1000; // Convert to meters
    const driveSpeed = (driveMotorRPM_Rad / driveGearing) * wheelRadius; // Speed in m/s

    // Weapon Calculations
    const weaponMotorRPM = weaponMotorKv * systemVoltage;
    const weaponMotorRPM_Rad = weaponMotorRPM * ((2 * pi) / 60);
    const weaponRPM = weaponMotorRPM / weaponGearing;
    const weaponRPM_Rad = weaponMotorRPM_Rad / weaponGearing;
    const weaponRadiusInM = weaponRadius / 1000; // Convert to meters
    const tipSpeed = weaponRPM_Rad * weaponRadiusInM; // Speed in m/s
    const weaponKE = 0.5 * momentOfInertia * 1e-9 * (weaponRPM_Rad ** 2); // Convert g*mm^2 to kg*m^2
    const biteTime = (2 * pi) / (numImpactors * weaponRPM_Rad);
    const bite = driveSpeed * biteTime * 1000; // Convert to mm

    // Convert outputs to English units
    const driveSpeedInchPerSec = driveSpeed / mmToInch; // Convert m/s to inch/s
    const tipSpeedInchPerSec = tipSpeed / mmToInch; // Convert m/s to inch/s
    const weaponKEOzin2 = weaponKE / gmm2ToOzin2; // Convert J to oz*in^2
    const biteInches = bite / mmToInch; // Convert mm to inches

    // Display Results
    document.getElementById("driveSpeed").textContent = `${driveSpeed.toFixed(2)} m/s (${driveSpeedInchPerSec.toFixed(2)} in/s)`;
    document.getElementById("weaponRPM").textContent = `${weaponRPM.toFixed(2)} RPM`;
    document.getElementById("tipSpeed").textContent = `${tipSpeed.toFixed(2)} m/s (${tipSpeedInchPerSec.toFixed(2)} in/s)`;
    document.getElementById("weaponKE").textContent = `${weaponKE.toFixed(2)} J (${weaponKEOzin2.toFixed(2)} oz*in^2)`;
    document.getElementById("bite").textContent = `${bite.toFixed(2)} mm (${biteInches.toFixed(2)} in)`;
}

// Assuming you have a button in your HTML to trigger this calculation:
document.getElementById("calculateResults").addEventListener("click", calculateResults);
