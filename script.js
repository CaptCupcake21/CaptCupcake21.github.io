function solveQuadratic() {
    const a = document.getElementById('a-coef').value;
    const b = document.getElementById('b-coef').value;
    const c = document.getElementById('c-coef').value;
    
    const rootPart = Math.sqrt(b * b - 4 * a * c);
    const denom = 2 * a;
    
    const root1 = (-b + rootPart) / denom;
    const root2 = (-b - rootPart) / denom;
    
    const solution = document.getElementById('solution');
    
    if(rootPart > 0) {
        solution.innerHTML = `Roots are real and different: <br> x1 = ${root1.toFixed(2)} <br> x2 = ${root2.toFixed(2)}`;
    } else if(rootPart === 0) {
        solution.innerHTML = `Roots are real and same: <br> x = ${root1.toFixed(2)}`;
    } else {
        solution.innerHTML = "No Real Solution";
    }
}
