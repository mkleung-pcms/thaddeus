input.onButtonPressed(Button.A, function () {
    seconds += 60
    if (seconds > 1800) {
        seconds = 1800
    }
})
input.onPinPressed(TouchPin.P2, function () {
    sound = 1 - sound
})
input.onButtonPressed(Button.AB, function () {
    seconds = 0
})
input.onButtonPressed(Button.B, function () {
    while (seconds > 0 && !(input.logoIsPressed())) {
        basic.pause(1000)
        seconds += -1
    }
    while (!(input.logoIsPressed())) {
        pins.analogWritePin(AnalogPin.P1, 1023)
        if (sound == 1) {
            music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.InBackground)
        } else {
            music.stopAllSounds()
        }
    }
    music.stopAllSounds()
    pins.analogWritePin(AnalogPin.P1, 0)
})
let minute_text = ""
let second_text = ""
let new_seconds = 0
let minutes = 0
let distance = 0
let seconds = 0
let sound = 0
sound = 1
seconds = 0
sensors.i2cLcdInit(39)
basic.forever(function () {
    distance = sensors.Ultrasonic(DigitalPin.P15)
    minutes = Math.trunc(seconds / 60)
    new_seconds = seconds % 60
    if (new_seconds < 10) {
        second_text = "0" + new_seconds
    } else {
        second_text = convertToText(new_seconds)
    }
    if (minutes < 10) {
        minute_text = "0" + minutes
    } else {
        minute_text = convertToText(minutes)
    }
    sensors.i2cLcdShowString(1, 1, "" + minute_text + ":" + second_text)
    if (distance < 10) {
        sensors.i2cLcdShowString(2, 1, "00" + distance)
    } else if (distance < 100) {
        sensors.i2cLcdShowString(2, 1, "0" + distance)
    } else {
        sensors.i2cLcdShowNumber(2, 1, distance)
    }
    if (distance < 50) {
        pins.analogWritePin(AnalogPin.P1, 1023)
        if (sound == 1) {
            music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
        } else {
            music.stopAllSounds()
        }
    } else {
        pins.analogWritePin(AnalogPin.P1, 0)
        music.stopAllSounds()
    }
})
