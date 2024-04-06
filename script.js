function calculateRobotCombat() {
    // Constants
    const gravity = 9.80665;
    const cellVoltage = 4.2;
    const pi = 3.141592653589793238;

    // General Inputs
    const robotMass = parseFloat(document.getElementById("robotMass").value);
    const matchLength = parseFloat(document.getElementById("matchLength").value);
    const distBetweenWheels = parseFloat(document.getElementById("distBetweenWheels").value);

    // Power Inputs
    const cellCount = parseInt(document.getElementById("cellCount").value, 10);
    const batteryCapacity = parseFloat(document.getElementById("batteryCapacity").value);

    // Drive Inputs
    const numDriveMotor = parseInt(document.getElementById("numDriveMotor").value, 10);
    const wheelDiameter = parseFloat(document.getElementById("wheelDiameter").value);
    const driveMotorKv = parseInt(document.getElementById("driveMotorKv").value, 10);
    const driveMotorInternalResistance = parseFloat(document.getElementById("driveMotorInternalResistance").value);
    const driveMotorCurrentDraw = parseFloat(document.getElementById("driveMotorCurrentDraw").value);
    const driveIntensitySlider = parseFloat(document.getElementById("driveIntensitySlider").value) / 100; // Convert percentage to decimal
    const frictionSlider = parseFloat(document.getElementById("frictionSlider").value);
    const driveGearing = parseFloat(document.getElementById("driveGearing").value);
    const driveMaxPowerSlider = parseFloat(document.getElementById("driveMaxPowerSlider").value) / 100; // Convert percentage to decimal

    // Weapon Inputs
    const numWeaponMotor = parseInt(document.getElementById("numWeaponMotor").value, 10);
    const weaponMotorKv = parseInt(document.getElementById("weaponMotorKv").value, 10);
    const weaponMotorInternalResistance = parseFloat(document.getElementById("weaponMotorInternalResistance").value);
    const weaponMotorCurrentDraw = parseFloat(document.getElementById("weaponMotorCurrentDraw").value);
    const weaponRadius = parseFloat(document.getElementById("weaponRadius").value);
    const numImpactors = parseInt(document.getElementById("numImpactors").value, 10);
    const momentOfInertia = parseFloat(document.getElementById("momentOfInertia").value);
    const weaponGearing = parseFloat(document.getElementById("weaponGearing").value);
    const weaponIntensity = parseFloat(document.getElementById("weaponIntensity").value) / 100; // Convert percentage to decimal
    const weaponMaxPowerSlider = parseFloat(document.getElementById("weaponMaxPowerSlider").value) / 100; // Convert percentage to decimal

    // General Calculations
    const systemVoltage = cellCount * cellVoltage;
    const batteryCapacityInA = batteryCapacity / 1000;
    const robotMassInKg = robotMass / 1000;
    const currentAvailable = batteryCapacityInA * 3600 / matchLength;

    // Power Calculations
    const driveCurrentUsageInA = numDriveMotor * ((driveMotorCurrentDraw * driveMaxPowerSlider) + (driveIntensitySlider * driveMotorCurrentDraw * (1 - driveMaxPowerSlider)));
    const weaponCurrentUsageInA = numWeaponMotor * ((weaponMotorCurrentDraw * weaponMaxPowerSlider) + (weaponIntensity * weaponMotorCurrentDraw * (1 - weaponMaxPowerSlider)));
    const totalCurrentUsage = driveCurrentUsageInA + weaponCurrentUsageInA;

    // Drive Calculations
    const driveMotorRPM = driveMotorKv * systemVoltage;
    const driveMotorRPM_Rad = driveMotorRPM * ((2 * pi) / 60);
    const wheelRadius = wheelDiameter / 2 / 1000;
    const driveSpeed = (driveMotorRPM_Rad / driveGearing) * wheelRadius;
    const pushingPower = robotMassInKg * gravity * frictionSlider;
    const drivePower = systemVoltage * driveMotorCurrentDraw * numDriveMotor;
    const driveTorque = (drivePower / driveMotorRPM_Rad) * driveGearing;

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
    document.getElementById("currentAvailable").textContent = `Estimated Current Available: ${currentAvailable.toFixed(2)} A`;
    document.getElementById("totalCurrentUsage").textContent = `Expected Current Usage: ${totalCurrentUsage.toFixed(2)} A`;
    document.getElementById("driveSpeed").textContent = `Drive Speed is: ${driveSpeed.toFixed(2)} m/s`;
    document.getElementById("pushingPower").textContent = `Pushing Power is: ${pushingPower.toFixed(2)} N`;
    document.getElementById("driveTorque").textContent = `Drive Torque is: ${driveTorque.toFixed(2)} Nm`;
    document.getElementById("tipSpeed").textContent = `Weapon Tip Speed is: ${tipSpeed.toFixed(2)} m/s`;
    document.getElementById("weaponKE").textContent = `Weapon Kinetic Energy is: ${weaponKE.toFixed(2)} J`;
    document.getElementById("bite").textContent = `Weapon Bite is: ${bite.toFixed(2)} mm`;
}

// Assuming you have a button in your HTML to trigger this calculation:
document.getElementById("calculateButton").addEventListener("click", calculateRobotCombat);
