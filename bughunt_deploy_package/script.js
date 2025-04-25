
function runChallenge1() {
  const age = parseInt(document.getElementById("age1").value);
  const isSmoker = document.getElementById("smoker1").value === "true";
  let basePremium = 500;

  if (age > 50) basePremium += 200;
  if (isSmoker) basePremium =+ 300; // Bug here

  document.getElementById("output1").textContent = `Premium: $${basePremium}`;
}

function runChallenge2() {
  const checkbox = document.getElementById("coverageBox");
  const input = checkbox.value; // Buggy usage

  const result = isCoverageSelected(input); // intentionally wrong
  document.getElementById("output2").textContent = `Coverage selected: ${result}`;
}

function isCoverageSelected(input) {
  return input === true;
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

function runClosureChallenge() {
  const raw = document.getElementById("ids4").value;
  const policyIds = raw.split(',').map(s => s.trim());
  const result = makePolicyLinks(policyIds);
  document.getElementById("output4").textContent = JSON.stringify(result);
}

function makePolicyLinks(policyIds) {
  const links = [];
  for (var i = 0; i < policyIds.length; i++) {
    links.push(() => "/policy/" + policyIds[i]);
  }
  return links.map(fn => fn());
}

function runPremiumMapChallenge() {
  let raw = document.getElementById("policies5").value;
  let policies;
  try {
    policies = JSON.parse(raw);
  } catch (e) {
    document.getElementById("output5").textContent = "Invalid JSON";
    return;
  }
  let result = calculatePremiums(policies);
  document.getElementById("output5").textContent = JSON.stringify(result);
}

function calculatePremiums(policies) {
  // Buggy: missing return inside the block arrow
  return policies.map(policy => {
     policy.premium * policy.rate;
  });
}

function runPrimaryChallenge() {
  let raw = document.getElementById("policiesPrimary").value;
  let policies;
  try {
    policies = JSON.parse(raw);
  } catch (e) {
    document.getElementById("outputPrimary").textContent = "Invalid JSON";
    return;
  }
  let result = getPrimaryPolicy(policies);
  document.getElementById("outputPrimary").textContent = 
    JSON.stringify(result);
}

function getPrimaryPolicy(policies) {
  // Buggy: returns an array, even if only one policy has primary === true
  return policies.find(p => p.primary === true);
}



function revealBug(id) {
  const bugs = {
    1: `💡 Bug: 'basePremium =+ 300;' actually resets the value instead of adding to it.
✅ Fix: Use 'basePremium += 300;' to correctly increment.
🏦 Impact: Undercharges high-risk clients and affects revenue.`,
    2: `💡Bug: 'input === true' always fails when checking a checkbox, because form inputs return strings like "on" not booleans.
✅ Fix: Use 'checkbox.checked' to correctly get a true/false result.
🏦 Impact: Users may think they've added extra coverage, but the system silently ignores it—leading to trust issues and possible legal risk.`,
    3: `💡 Bug: Plan input is case-sensitive ("Premium" !== "premium").
✅ Fix: Normalize input with plan.toLowerCase().
📉 Impact: Customer may receive wrong coverage if input mismatches.`,
    4: `💡 Bug: Using var in the loop means all closures capture the final i value, so every link is wrong.
✅ Fix: Change 'var' to 'let' ->  for(let i = 0; …) .
🏦 Impact: Customers click broken policy URLs (404), support tickets spike, and trust erodes.`,
5: `💡 Bug: Bug: The block-form arrow callback doesn’t return a value, so map() yields [undefined,…].  
✅ Fix: Either use a concise arrow:  
\`\`\`js
policies.map(p => p.premium * p.rate);
\`\`\`
or add an explicit return in the block:  
\`\`\`js
policies.map(policy => {
  return policy.premium * policy.rate;
});
\`\`\`
🏦 Impact: Your reporting dashboard shows blank premium values—leading to misreported revenue and underwriting errors.`,
    6: `💡 Bug: getPrimaryPolicy uses filter(), so it always returns an array—even when you need one object.
✅ Fix: use find() to return a single policy object:
\`\`\`js
function getPrimaryPolicy(policies) {
  return policies.find(p => p.primary === true);
}
\`\`\`
🏦 Impact: The UI expecting one policy will break or show blank data, preventing customers from seeing their primary coverage and spiking support tickets.`
  };

  document.getElementById("bug" + id).textContent = bugs[id];
}
