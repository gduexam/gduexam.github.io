// 2014-08-18
// 2019-05-31
// copyright 2014 Xah Lee
// feel free to use, but must give credit, link back to this page
// from http://xahlee.info/js/js_raining_hearts.html

{

    const num_of_hearts = 30;
    const driftX = 50;
    const gravity = 100;
    const update_speed = 900; // millisecond

    // const heartTypes= [... "♥💕💓💔💖💗💘💝💞💟💙💚💛💜" ];
    const heartTypes = [...
        "💔♥"
    ];

    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    const viewSpaceWidth = viewportWidth + 50;
    const viewSpaceHeight = viewportHeight + 50;

    const randomInt = ((xmin, xmax) => (Math.floor(Math.random() * (xmax + 1 - xmin) + xmin)));

    const randomReal = ((xmin, xmax) => (Math.random() * (xmax - xmin) + xmin));

    const randomColor = (() => ("hsla" + "(" + randomInt(0, 360) + "," +
        randomInt(70, 100) + "%," +
        randomInt(40, 60) + "%," +
        randomReal(.8, 1) + ")"));

    const f_restart_heart = ((xx) => {
        xx["xxleft"] = randomInt(0, viewSpaceWidth);
        xx.style.left = xx["xxleft"] + "px";
        xx["xxtop"] = randomInt(0, viewSpaceHeight) - viewSpaceHeight;
        xx.style.top = xx["xxtop"] + "px";
        xx["xrotate"] = randomInt(-150, 150);
        xx.style.transform = "rotate(" + xx["xrotate"] + "deg)";
    });

    const heart_box = document.createElement("div");
    heart_box.setAttribute("id", "heart_box");

    const f_new_heart = (() => {
        const xx = document.createElement("div");
        xx.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        xx["xxleft"] = randomInt(0, viewSpaceWidth);
        xx.style.left = xx["xxleft"] + "px";
        xx["xxtop"] = -90;
        xx.style.top = xx["xxtop"] + "px";
        xx["xrotate"] = randomInt(-150, 150);
        xx.style.transform = "rotate(" + xx["xrotate"] + "deg)";
        xx.style.color = randomColor();
        xx["xsize"] = 10 + randomInt(0, 30);
        xx.style.fontSize = xx["xsize"] + "px";

        xx.style.position = "fixed";
        xx.style.zIndex = randomInt(100, 9999).toString();
        xx.style.transition = "top linear 1.5s, left linear 1.5s, transform linear 1.5s";
        // f_restart_heart(xx);
        return xx;
    });

    { for (let i = 0; i < num_of_hearts; i++) { heart_box.appendChild(f_new_heart()) } };

    document.body.appendChild(heart_box);

    const heartNodes = Array.from(heart_box.children);

    const f_update_positions = (() => {

        heartNodes.forEach(((xx: HTMLElement) => {
            xx["xxleft"] +=
                (() => {
                    const rnd = Math.random();
                    if (rnd < 0.3333) {
                        return 0;
                    } else if (rnd < 0.6666) {
                        return driftX;
                    } else {
                        return -driftX;
                    }
                })();

            xx["xxtop"] = xx["xxtop"] + ((xx["xsize"] / 20) * (gravity));

            if (xx["xxtop"] > (viewSpaceHeight) + viewSpaceHeight / 10) {
                f_restart_heart(xx);
            } else {
                xx["xxtop"] = xx["xxtop"] + gravity / 10 * randomInt(0, 10);
            };

            if (xx["xrotate"] !== 0) {
                xx["xrotate"] = xx["xrotate"] + randomInt(-30, 60);
                xx.style.transform = "rotate(" + xx["xrotate"] + "deg)";
            };

            xx.style.left = xx["xxleft"] + "px";
            xx.style.top = xx["xxtop"] + "px";
        }))

    });

    setInterval(f_update_positions, update_speed);
};