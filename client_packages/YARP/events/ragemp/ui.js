'use strict';
/**
* @file Ui events
* @namespace client.ui
*/

let oldWallet = 0;
let walletAdd = 0;
let oldBank = 0;
let bankAdd = 0;
let oldXp = 0;
let xpAdd = 0;
let xpChange = false;
let xpChangeDisplay = false;
let walletChange = false;
let walletChangeDisplay = false;
let bankChange = false;
let bankChangeDisplay = false;

/**
 * Displays help text on top left.
 * @event displayHelpText
 * @memberof client.ui
 * @param {string} text - Text to be displayed.
 */
mp.events.add('displayHelpText', (text) => {
  mp.game.ui.setTextComponentFormat('STRING');
  mp.game.ui.addTextComponentSubstringPlayerName(text);
  mp.game.ui.displayHelpTextFromStringLabel(0, false, true, -1);
});

/**
 * Clears help text on top left.
 * @event clearHelpText
 * @memberof client.ui
 */
mp.events.add('clearHelpText', () => {
  mp.game.ui.clearHelp(true);
});

/**
 * Diplays speedometer when inside a vehicle.
 * @function displaySpeedometer
 * @memberof client.ui
 * @param {boolean} mph - Miles or kilometers (true or false).
 */
function displaySpeedometer(mph) {
  if (mp.players.local.isInAnyVehicle(false)) {
    let velocity = mp.players.local.vehicle.getVelocity();
    let speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z);

    speed = (mph) ? speed * 2.236936 : speed * 3.6;

    mp.game.graphics.drawText(`Speed: ${speed.toFixed(0)}`, [0.5, 0.850], {
      font: 7,
      color: [255, 255, 255, 185],
      scale: [0.5, 0.5],
      outline: false,
    });
  }
}

/**
 * Diplays wallet and money changes.
 * @function displayWallet
 * @memberof client.ui
 */
function displayWallet() {
  let newWallet = mp.players.local.getVariable('PLAYER_WALLET');
  if (newWallet != null) {
    walletAdd += newWallet - oldWallet;
    oldWallet = newWallet;
    if (newWallet < 0) {
      mp.game.graphics.drawText(`-$${yarp.utils.numberWithCommas(newWallet)}`, [0.95, 0.1], {
        scale: [0.65, 0.65],
        color: [224, 50, 50, 255],
        font: 7,
      });
    } else {
      mp.game.graphics.drawText(`$${yarp.utils.numberWithCommas(newWallet)}`, [0.95, 0.1], {
        scale: [0.65, 0.65],
        color: [114, 204, 114, 255],
        font: 7,
      });
    }
  }
  if (walletAdd != 0) {
    walletChange = true;
  }
  if (walletChange) {
    if (!walletChangeDisplay) {
      walletChangeDisplay = true;
      setTimeout(() => {
        walletAdd = 0;
        walletChange = false;
        walletChangeDisplay = false;
      }, 5000);
    }
    if (walletAdd < 0) {
      mp.game.graphics.drawText(`-$${yarp.utils.numberWithCommas(Math.abs(walletAdd))}`, [0.95, 0.145], {
        scale: [0.65, 0.65],
        color: [224, 50, 50, 255],
        font: 7,
      });
    } else if (walletAdd > 0) {
      mp.game.graphics.drawText(`+$${yarp.utils.numberWithCommas(walletAdd)}`, [0.95, 0.145], {
        scale: [0.65, 0.65],
        color: [114, 204, 114, 255],
        font: 7,
      });
    }
  }
}

/**
 * Diplays bank and money changes.
 * @function displayBank
 * @memberof client.ui
 */
function displayBank() {
  let newBank = mp.players.local.getVariable('PLAYER_BANK');
  if (newBank != null) {
    bankAdd += newBank - oldBank;
    oldBank = newBank;
    if (newBank < 0) {
      mp.game.graphics.drawText(`-$${yarp.utils.numberWithCommas(newBank)}`, [0.95, 0.190], {
        scale: [0.65, 0.65],
        color: [224, 50, 50, 255],
        font: 7,
      });
    } else {
      mp.game.graphics.drawText(`$${yarp.utils.numberWithCommas(newBank)}`, [0.95, 0.190], {
        scale: [0.65, 0.65],
        color: [114, 114, 204, 255],
        font: 7,
      });
    }
  }
  if (bankAdd != 0) {
    bankChange = true;
  }
  if (bankChange) {
    if (!bankChangeDisplay) {
      bankChangeDisplay = true;
      setTimeout(() => {
        bankAdd = 0;
        bankChange = false;
        bankChangeDisplay = false;
      }, 5000);
    }
    if (bankAdd < 0) {
      mp.game.graphics.drawText(`-$${yarp.utils.numberWithCommas(Math.abs(bankAdd))}`, [0.95, 0.235], {
        scale: [0.65, 0.65],
        color: [224, 50, 50, 255],
        font: 7,
      });
    } else if (bankAdd > 0) {
      mp.game.graphics.drawText(`+$${yarp.utils.numberWithCommas(bankAdd)}`, [0.95, 0.235], {
        scale: [0.65, 0.65],
        color: [114, 114, 204, 255],
        font: 7,
      });
    }
  }
}

/**
 * Diplays xp and xp changes.
 * @function displayXp
 * @memberof client.ui
 */
function displayXp() {
  let newXp = mp.players.local.getVariable('PLAYER_XP');
  if (newXp != null) {
    xpAdd += newXp - oldXp;
    oldXp = newXp;
    if (newXp < 0) {
      mp.game.graphics.drawText(`-${yarp.utils.numberWithCommas(newXp)} XP`, [0.95, 0.280], {
        scale: [0.65, 0.65],
        color: [224, 50, 50, 255],
        font: 7,
      });
    } else {
      mp.game.graphics.drawText(`${yarp.utils.numberWithCommas(newXp)} XP`, [0.95, 0.280], {
        scale: [0.65, 0.65],
        color: [80, 80, 224, 255],
        font: 7,
      });
    }
  }
  if (xpAdd != 0) {
    xpChange = true;
  }
  if (xpChange) {
    if (!xpChangeDisplay) {
      xpChangeDisplay = true;
      setTimeout(() => {
        xpAdd = 0;
        xpChange = false;
        xpChangeDisplay = false;
      }, 5000);
    }
    if (xpAdd < 0) {
      mp.game.graphics.drawText(`-${yarp.utils.numberWithCommas(Math.abs(xpAdd))} XP`, [0.95, 0.325], {
        scale: [0.65, 0.65],
        color: [224, 50, 50, 255],
        font: 7,
      });
    } else if (xpAdd > 0) {
      mp.game.graphics.drawText(`+${yarp.utils.numberWithCommas(xpAdd)} XP`, [0.95, 0.325], {
        scale: [0.65, 0.65],
        color: [80, 80, 224, 255],
        font: 7,
      });
    }
  }
}

/**
 * Renders the UI.
 * @event render
 * @memberof client.ui
 */
mp.events.add('render', () => {
  displaySpeedometer();
  displayWallet();
  displayBank();
  displayXp();
});
