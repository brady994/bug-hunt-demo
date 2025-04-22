
function runChallenge1() {
  const age = parseInt(document.getElementById("age1").value);
  const isSmoker = document.getElementById("smoker1").value === "true";
  let basePremium = 500;

  if (age > 50) basePremium += 200;
  if (isSmoker) basePremium =+ 300; // Bug here

  document.getElementById("output1").textContent = `Premium: $${basePremium}`;
}

function runChallenge2() {
  const age = parseInt(document.getElementById("age2").value);
  const condition = document.getElementById("condition2").value;

  if (age >= 18 && age <= 65 && condition === false)
    document.getElementById("output2").textContent = "Eligible: true";
  else
    document.getElementById("output2").textContent = "Eligible: false";
}

function runChallenge3() {
  let plan = document.getElementById("plan3").value;
  let base = parseFloat(document.getElementById("base3").value);

  if (plan === "standard") {
    document.getElementById("output3").textContent = `Coverage: $${base}`;
  } else if (plan === "premium") {
    document.getElementById("output3").textContent = `Coverage: $${base * 1.5}`;
  } else if (plan === "vip") {
    document.getElementById("output3").textContent = `Coverage: $${base * 2}`;
  } else {
    document.getElementById("output3").textContent = "Invalid plan type.";
  }
}

function revealBug(id) {
  const bugs = {
    1: `💡 Bug: 'basePremium =+ 300;' actually resets the value instead of adding to it.
✅ Fix: Use 'basePremium += 300;' to correctly increment.
🏦 Impact: Undercharges high-risk clients and affects revenue.`,
    2: `💡 Bug: 'condition === false' fails if the value is a string ("false").
✅ Fix: Ensure boolean type, or use String(condition).toLowerCase() === "false".
⚠️ Impact: Could approve ineligible clients, a compliance risk.`,
    3: `💡 Bug: Plan input is case-sensitive ("Premium" !== "premium").
✅ Fix: Normalize input with plan.toLowerCase().
📉 Impact: Customer may receive wrong coverage if input mismatches.`
  };

  document.getElementById("bug" + id).textContent = bugs[id];
}
