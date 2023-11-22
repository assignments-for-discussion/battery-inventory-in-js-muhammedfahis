const assert = require('assert');

function countBatteriesByHealth(presentCapacities) {
  let batteries = {
    healthy: 0,
    exchange: 0,
    failed: 0
  };

  for (let capacity of presentCapacities) {
    let batteryStatus = getBatteryStatus(getBatterySOH(capacity));
    if (batteryStatus === 'healthy') {
      batteries.healthy++;
    } else if (batteryStatus === 'exchange') {
      batteries.exchange++;
    } else if (batteryStatus === 'failed') {
      batteries.failed++;
    }
  }

  return batteries;
}

function getBatteryStatus(capacity) {
  if (capacity >= 80 && capacity <=100) {
    return 'healthy';
  } else if (capacity < 80 && capacity>=62) {
    return 'exchange';
  } else if(capacity < 62) {
    return 'failed';
  }
}

function getBatterySOH(currCapacity) {
  return (currCapacity / 120) * 100;
}


function testBucketingByHealth() {
  console.log('Counting batteries by SoH...');
  const presentCapacities = [113, 116, 80, 95, 92, 70];
  counts = countBatteriesByHealth(presentCapacities);
  assert(counts["healthy"] == 2);
  assert(counts["exchange"] == 3);
  assert(counts["failed"] == 1);
  console.log("Done counting :)");
}

testBucketingByHealth();