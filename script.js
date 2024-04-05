function calculateDrive() {
    // Input values
    const motorKv = parseFloat(document.getElementById("motorKv").value);
    const gearing = parseFloat(document.getElementById("gearing").value);
    const wheelDiameter = parseFloat(document.getElementById("wheelDiameter").value); // in inches
    const coefficientOfFriction = parseFloat(document.getElementById("coefficientOfFriction").value);
    const robotWeight = 50; // Assuming a robot weight of 50kg for calculation, adjust as necessary

    // Constants
    const wheelRadius = wheelDiameter * 0.0254 / 2; // Convert diameter in inches to radius in meters

    // Calculations (Simplified)
    const rpm = motorKv * 7.4; // Assuming a 7.4V battery, adjust as necessary
    const robotSpeed = (rpm / gearing) * (wheelDiameter * Math.PI) / 60; // Speed in meters per minute, converted to m/s
    const torque = (0.105 * rpm) / gearing; // Simplified torque calculation
    const maxPushingForce = coefficientOfFriction * robotWeight * 9.81; // Simplified pushing force calculation

    // Output values
    document.getElementById("torque").value = torque.toFixed(2);
    document.getElementById("rpm").value = (rpm / gearing).toFixed(0);
    document.getElementById("robotSpeed").value = (robotSpeed / 60).toFixed(2);
    document.getElementById("maxPushingForce").value = maxPushingForce.toFixed(2);
}
