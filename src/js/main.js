let win_width = window.innerWidth;
let win_height = window.innerHeight;

let app = new PIXI.Application({width: win_width, height: win_height, backgroundColor: 0xdedede});
document.getElementById("root").appendChild(app.view);
app.stage.sortableChildren = true;

let bg = PIXI.Sprite.from("src/images/bg.png");
bg.width = win_width;
bg.position.y = - win_height/2;
// bg.height = win_height;
app.stage.addChild(bg);

let top_bar = PIXI.Sprite.from("src/images/ui/top_bar.png");
top_bar.width = bg.width;
top_bar.zIndex = 3;

let logo = PIXI.Sprite.from("src/images/ui/logo_v1.png");
logo.anchor.set(0.5);
logo.position.set(win_width/2, 85);
logo.zIndex = 3;

let crow = PIXI.Sprite.from("src/images/ui/crow.png");
crow.anchor.set(0.5);
crow.position.set(100, (win_height/2) - 50);

let bottom_bar = PIXI.Sprite.from("src/images/ui/bottom_bar.png");
bottom_bar.width = bg.width;
bottom_bar.position.y = win_height - 26;

const container = new PIXI.Container();
app.stage.addChild(container);

let frame = PIXI.Sprite.from("src/images/ui/reel_frame.png");
frame.anchor.set(0.5);
frame.position.set(win_width/2, (win_height/2) - 50);
frame.zIndex = 2;

let backdrop = PIXI.Sprite.from("src/images/ui/backdrop.png");
backdrop.anchor.set(0.5);
backdrop.position.set(win_width/2, (win_height/2) - 40);
backdrop.zIndex = 0;

let symbols = ["H1", "H2", "H3", "H4", "M1", "M2", "R1", "R2", "R3", "R4", "Scatter", "Scatter_txt", "Wild", "Wild_txt"];

const textureArray = [];
let randInt = Math.floor(Math.random() * 14)

let path1 = "src/images/symbols/" + symbols[randInt] + ".png"
let path2 = "src/images/symbols/" + symbols[randInt] + "_b.png"

const texture1 = PIXI.Texture.from(path1);
const texture2 = PIXI.Texture.from(path2);

textureArray.push(texture1, texture2);

const symbol1 = new PIXI.AnimatedSprite(textureArray);
symbol1.anchor.set(0.5);
symbol1.height = 150;
symbol1.width = 150;

symbol1.position.y = (win_height/2) - (symbol1.height);
symbol1.position.x = win_width/2;
symbol1.play();
symbol1.animationSpeed = 0.05;
console.log(symbol1.height)

app.stage.addChild(top_bar, logo, crow, bottom_bar)
container.addChild(frame, backdrop, symbol1)