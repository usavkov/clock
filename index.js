'use strict'

const watchesLoaded = new Promise((res, rej) => {
    document.querySelector('#watches').addEventListener('load', (event) => {
        res(event.target.contentDocument.querySelector('svg'));
    })
})

watchesLoaded.then((svg) => {
    const hourHand = svg.querySelector('#hourHand');
    const minHand = svg.querySelector('#minHand');
    const secHand = svg.querySelector('#secHand');

    function setHands() {
        const curDate = new Date();
        
        const curHours = curDate.getHours() > 12 ? curDate.getHours() - 12 : curDate.getHours();
        const curMinutes = curDate.getMinutes();
        const curSeconds = curDate.getSeconds();

        const sDeg = curSeconds / 60 * 360;
        const mDeg = curMinutes / 60 * 360;
        const hDeg = (curHours / 12 * 360) + (curMinutes / 12 / 60 * 360);

        if (curHours === 0) {
            (function throwSec() {
                secHand.style.transitionDuration = '0s';
                setTimeout(() => {
                    secHand.style.transitionDuration = '.25s';
                })
            })()
        }

        if (curMinutes === 0) {
            (function throwMin() {
                minHand.style.transitionDuration = '0s';
                setTimeout(() => {
                    minHand.style.transitionDuration = '.25s';
                })
            })()
        }

        if (curSeconds === 0) {
            (function throwSec() {
                secHand.style.transitionDuration = '0s';
                setTimeout(() => {
                    secHand.style.transitionDuration = '.25s';
                })
            })()
        }

        secHand.style.transform = `rotate(${sDeg}deg)`;
        minHand.style.transform = `rotate(${mDeg}deg)`;
        hourHand.style.transform = `rotate(${hDeg}deg)`;
    }

    setInterval(setHands, 1000);
})