const INITIAL_NAME_KEY = "elapsedPlayerOriginalName"
let onMotionKey;

async function main() {
    await $.getScript("https://cdn.jsdelivr.net/gh/parseml/many-deobf@latest/deobf.js");

    const initialName = localStorage.getItem(INITIAL_NAME_KEY);
    if (initialName !== null) {
        ig.game.player.changeName(initialName);
        localStorage.removeItem(INITIAL_NAME_KEY);
    }

    onMotionKey = Deobfuscator.function(ig.game.motionDialog, 'function(){1<=b.motionIds.length&&', true);
    ig.game.motionDialog.oldTalkFunc = ig.game.motionDialog[onMotionKey];
    ig.game.motionDialog.elapsePlayer = elapsePlayer;
    ig.game.motionDialog.getBack = getBack;

    ig.game.motionDialog[onMotionKey] = function (a) {
        ig.game.motionDialog.oldTalkFunc(a);

        if (a.toLowerCase() === 'afk')
            ig.game.motionDialog.elapsePlayer();
    }
}

class ElapsedPlayer {
    constructor(initialName) {
        this.initialTime = Math.floor(Date.now() / 1000);
        this.initialName = initialName;
        this.elapsedInterval = setInterval(() => this._changeOnAFK(), 1000);

        localStorage.setItem(INITIAL_NAME_KEY, this.initialName);
    }

    _getTimeString() {
        const parseNumber = number => `${number}`.padStart(2, '0');
        const secondsElapsed = Math.floor(Date.now() / 1000) - this.initialTime;
        const [hours, minutes, remainingSeconds] = [
            Math.floor(secondsElapsed / 3600),
            Math.floor((secondsElapsed % 3600) / 60),
            secondsElapsed % 60
        ];

        return `${parseNumber(hours)}-${parseNumber(minutes)}-${parseNumber(remainingSeconds)}`;
    }

    _changeOnAFK() {
        if (!ig.game.player.keepEyesClosedDueToBoost || !ig.game.alertDialog.isOpen)
            ig.game.motionDialog.getBack();
        else
            ig.game.player.changeName(`.  AFK  . ${this._getTimeString()}`);
    }
}

function elapsePlayer() {
    ig.game.elapsedPlayer = new ElapsedPlayer(ig.game.player.screenName);
    ig.game.alertDialog.open(`you're now afk! (do anything or press the 'back' button below to stop being afk)`, false, ig.game.motionDialog.getBack, "back", null, null, null, null, null, null, null, true);
    ig.game.sounds.score_down.play();

    ig.game.player.keepEyesClosedDueToBoost = true;
}

function getBack() {
    clearInterval(ig.game.elapsedPlayer.elapsedInterval);
    ig.game.player.changeName(ig.game.elapsedPlayer.initialName);
    ig.game.elapsedPlayer = undefined;
    localStorage.removeItem(INITIAL_NAME_KEY);

    ig.game.alertDialog.close();
    ig.game.player.say("'AFK' state cleared!");
    ig.game.sounds.success.play();

    ig.game.player.keepEyesClosedDueToBoost = false;
}

!async function loader() {
    let loading = setInterval(function () {
        if (typeof ig === "undefined")
            return
        if (typeof ig.game === "undefined")
            return
        if (typeof ig.game.screen === "undefined")
            return
        if (ig.game.screen.x == 0)
            return

        clearInterval(loading);
        main();
    }, 250);
}();
