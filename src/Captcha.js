import React from "react";


function generateCaptchaImage(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const canvasWidth = 200;
    const canvasHeight = 90;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Background color
    context.fillStyle = '#EEE';
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < text.length; i++) {
        // Random color
        const color = getRandomColor();
        context.fillStyle = color;

        // Random font
        const fontSize = getRandomInt(20, 30);
        context.font = `${fontSize}px Arial`;

        // Random rotation
        const rotation = getRandomInt(-10, 10);
        context.rotate((rotation * Math.PI) / 180);

        // Draw the character
        const x = i * (canvasWidth / text.length) + getRandomInt(2, 10);
        const y = canvasHeight / 2;
        context.fillText(text[i], x, y);

        // Reset rotation for the next character
        context.rotate((-rotation * Math.PI) / 180);
    }

    return canvas.toDataURL('image/png').replace(/^data:image\/\w+;base64,/, '');
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 30) % 16];
    }
    return color;
}

function generateCaptchaText() {
    const letters = '0123456789qwertyuiopasdfghjklzxcvbnm';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += letters[Math.floor(Math.random() * 100) % letters.length];
    }
    return result
}

export function updCaptchaImg() {
    text = generateCaptchaText();
    img = generateCaptchaImage(text);
}

export let text = generateCaptchaText();
export let img = generateCaptchaImage(text);