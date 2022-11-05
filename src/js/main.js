let win_width = window.innerWidth;
let win_height = window.innerHeight;

let app = new PIXI.Application({width: win_width, height: win_height, backgroundColor: 0xdedede});
document.getElementById("root").appendChild(app.view);
app.stage.sortableChildren = true;

let bg = new PIXI.Sprite.from("src/images/bg.png");
bg.width = win_width;
bg.position.y = - win_height/2;
// bg.height = win_height;
app.stage.addChild(bg);

let top_bar = new PIXI.Sprite.from("src/images/ui/top_bar.png");
top_bar.width = bg.width;
top_bar.zIndex = 3;

let logo = new PIXI.Sprite.from("src/images/ui/logo_v2.png");
logo.anchor.set(0.5);
logo.position.set(win_width/2, 85);
logo.zIndex = 3;

let crow = new PIXI.Sprite.from("src/images/ui/crow.png");
crow.anchor.set(0.5);
crow.position.set(100, (win_height/2) - 50);

let frame = new PIXI.Sprite.from("src/images/ui/reel_frame.png");
frame.anchor.set(0.5);
frame.position.set(win_width/2, (win_height/2) - 50);
frame.zIndex = 2;

let backdrop = new PIXI.Sprite.from("src/images/ui/backdrop.png");
backdrop.anchor.set(0.5);
backdrop.position.set(win_width/2, (win_height/2) - 40);
backdrop.zIndex = 0;

let bottom_bar = new PIXI.Sprite.from("src/images/ui/bottom_bar.png");
bottom_bar.width = bg.width;
bottom_bar.position.y = win_height - 26;

app.stage.addChild(top_bar, logo, crow, frame, backdrop, bottom_bar)